pragma solidity >=0.4.22 <0.9.0;

contract Users {
    struct Role {
        string name;
        uint256 level;
    }

    struct User {
        address addr;
        string name;
        Role role;
    }

    address owner;

    uint256 adminLevel = 10;
    uint256 userLevel = 1;

    Role adminRole = Role("Admin", adminLevel);
    Role userRole = Role("User", userLevel);

    mapping(address => User) users;
    mapping(uint256 => address) addresses;
    uint256 userCount = 0;

    constructor() public {
        owner = msg.sender;
        addresses[userCount] = owner;
        users[owner] = User(owner, "Bayram ALACAM", adminRole);
        userCount++;
    }

    // Kullanıcı kayıtlı mı?
    function isRegistered(address _addr) public view returns (bool) {
        return users[_addr].addr != address(0);
    }

    // Kayıt ol
    function register(string memory _name) public {
        address _addr = msg.sender;
        require(!isRegistered(_addr), "ERR_IS_REGISTERED");
        addresses[userCount] = _addr;
        users[_addr] = User(_addr, _name, userRole);
        userCount++;
    }

    // İsim bilgisini güncelle
    function setName(string memory _name) public {
        address _addr = msg.sender;
        require(isRegistered(_addr), "ERR_SET_NAME_1");
        users[_addr].name = _name;
    }

    // Kullanıcı bilgisini getir
    function getUser(address _addr)
        public
        view
        returns (string memory name, uint256 roleLevel)
    {
        require(isRegistered(_addr), "ERR_GET_MY_PROFILE");
        return (users[_addr].name, users[_addr].role.level);
    }

    // Kullanıcı yetkisini değiştir
    function setUserRole(address _addr, uint256 _roleLevel)
        public
        onlyAdminRole
    {
        // Sistem sahibi kendi yetkisini değiştiremez
        require(_addr != owner, "ERR_SET_USER_ROLE_1");
        // Admin ve User dışındaki yetkileri kabul etme
        require(
            _roleLevel == userLevel || _roleLevel == adminLevel,
            "ERR_SET_USER_ROLE_2"
        );
        if (_roleLevel == 10) users[_addr].role = adminRole;
        else users[_addr].role = userRole;
    }

    // Tüm kullanıcılar
    function getUsers() public view returns (address[] memory) {
        address[] memory _addresses = new address[](userCount);
        for (uint256 i = 0; i < userCount; i++) {
            _addresses[i] = addresses[i];
        }
        return _addresses;
    }

    // Admin ve User kullanıcılarının sayısını döndürür
    function getAdminAndUserCount() public view returns (uint256[] memory) {
        uint256[] memory _count = new uint256[](2);
        _count[0] = 0;
        _count[1] = 0;
        for (uint256 i = 0; i < userCount; i++) {
            if (users[addresses[i]].role.level == adminLevel) {
                _count[0]++;
            } else {
                _count[1]++;
            }
        }
        return _count;
    }

    // Sadece Admin yetkisi olan işlem yapabilsin
    modifier onlyAdminRole() {
        require(
            users[msg.sender].role.level == adminLevel,
            "ERR_ONLY_ADMIN_ROLE"
        );
        _;
    }
}

contract Votes is Users {
    uint256 public voteCount = 0;

    struct Vote {
        uint256 id;
        string subject;
        string detail;
        uint256 startDate;
        uint256 endDate;
        uint256 status;
    }

    uint256 closedStatus = 0;
    uint256 openStatus = 1;
    uint256 freezeStatus = 2;

    mapping(uint256 => Vote) public votes;

    struct userVote {
        address addr;
        uint256 voteId;
        bool vote;
    }

    uint256 usedVoteCount = 0;
    mapping(uint256 => userVote) public usedVotes;

    // Oy kullan
    function useVote(uint256 _id, bool _vote) public {
        address _addr = msg.sender;
        // Kayıtlı değilse oy kullanamaz
        require(isRegistered(_addr), "ERR_USE_VOTE_1");
        // Bulunmayan oylama kullanılamaz
        require(votes[_id].id != 0, "ERR_USE_VOTE_2");
        // Daha önce oy kullanıldıysa kullanılamaz
        for (uint256 i = 1; i <= usedVoteCount; i++) {
            if (address(usedVotes[i].addr) == address(_addr)) {
                require(usedVotes[i].voteId != _id, "ERR_USE_VOTE_3");
            }
        }
        // Oylama zaten kapalıysa kullanılamaz
        require(votes[_id].status != 0, "ERR_USE_VOTE_4");
        // Bitiş tarihini geçtiyse kullanılamaz
        require(votes[_id].endDate > block.timestamp, "ERR_USE_VOTE_5");
        usedVoteCount++;
        usedVotes[usedVoteCount] = userVote(_addr, _id, _vote);
    }

    // Kullanıcının kullandığı oylar
    function usedVoteList(address _addr)
        public
        view
        returns (uint256[] memory)
    {
        uint256 count = 0;
        uint256 index = 0;
        for (uint256 i = 1; i <= usedVoteCount; i++) {
            if (address(usedVotes[i].addr) == address(_addr)) {
                count++;
            }
        }
        uint256[] memory ids = new uint256[](count);
        for (uint256 i = 1; i <= usedVoteCount; i++) {
            if (address(usedVotes[i].addr) == address(_addr)) {
                ids[index] = i;
                index++;
            }
        }
        return ids;
    }

    // Kullanıcının kullandığı oy sayısı
    function userUsedVoteCount(address _addr) public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 1; i <= usedVoteCount; i++) {
            if (address(usedVotes[i].addr) == address(_addr)) {
                count++;
            }
        }
        return count;
    }

    // Kullanıcının kullanmadığı oy sayısı
    function userUnusedVoteCount(address _addr) public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 1; i <= usedVoteCount; i++) {
            if (address(usedVotes[i].addr) == address(_addr)) {
                count++;
            }
        }
        return voteCount - count;
    }

    // Kullanılan oy bilgisi
    function usedVote(uint256 _id) public view returns (uint256, bool) {
        // Böyle bir kullanılan oy yoksa hata döndür
        require(usedVotes[_id].addr != address(0), "ERR_USED_VOTE");
        return (usedVotes[_id].voteId, usedVotes[_id].vote);
    }

    // Evet olarak kullanılan oy sayısı
    function usedVoteYes(uint256 _id) public view returns (uint256 _count) {
        // Böyle bir oylama yoksa sonuç alamaz
        require(votes[_id].id != 0, "ERR_USED_VOTES_YES");
        uint256 count = 0;
        for (uint256 i = 1; i <= usedVoteCount; i++) {
            if (usedVotes[i].voteId == _id && usedVotes[i].vote == true) {
                count++;
            }
        }
        return count;
    }

    // Hayır olarak kullanılan oy sayısı
    function usedVoteNo(uint256 _id) public view returns (uint256 _count) {
        // Böyle bir oylama yoksa sonuç alamaz
        require(votes[_id].id != 0, "ERR_USED_VOTES_YES");
        uint256 count = 0;
        for (uint256 i = 1; i <= usedVoteCount; i++) {
            if (usedVotes[i].voteId == _id && usedVotes[i].vote == false) {
                count++;
            }
        }
        return count;
    }

    // Oylama oluştur
    function createVote(
        string memory _subject,
        string memory _detail,
        uint256 _endDate
    ) public onlyAdminRole {
        uint256 _startDate = block.timestamp;
        require(_endDate >= _startDate, "ERR_CREATE_VOTE");
        voteCount++;
        votes[voteCount] = Vote(
            voteCount,
            _subject,
            _detail,
            _startDate,
            _endDate,
            openStatus
        );
    }

    // Bir oyun bilgisini getir
    function getVote(uint256 _id)
        public
        view
        returns (
            uint256 id,
            string memory subject,
            string memory detail,
            uint256 startDate,
            uint256 endDate,
            uint256 status
        )
    {
        require(votes[_id].id != 0, "ERR_GET_VOTE");
        return (
            votes[_id].id,
            votes[_id].subject,
            votes[_id].detail,
            votes[_id].startDate,
            votes[_id].endDate,
            votes[_id].status
        );
    }

    // Oylama durumunu değiştir
    function setVoteStatus(uint256 _id, uint256 _status) public onlyAdminRole {
        // Farklı durum kodu gönderilemez
        require(_status >= 0 && _status <= 2, "ERR_SET_VOTE_STATUS_1");
        // Bulunamayan Oylama Değiştirilemez
        require(votes[_id].id != 0, "ERR_SET_VOTE_STATUS_2");
        // Oylama zaten kapalıysa değiştirilemez
        require(votes[_id].status != 0, "ERR_SET_VOTE_STATUS_3");
        // Bitiş tarihini geçtiyse değiştirilemez
        require(votes[_id].endDate > block.timestamp, "ERR_SET_VOTE_STATUS_4");
        votes[_id].status = _status;
    }
}

contract VotingApp is Users, Votes {}
