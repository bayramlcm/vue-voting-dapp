pragma solidity >=0.4.22 <0.9.0;


contract Users {

    struct Role {
        string name;
        uint level;
    }

    struct User {
        address addr;
        string name;
        Role role;
    }

    address owner;

    uint adminLevel = 10;
    uint userLevel = 1;

    Role adminRole = Role("Admin", adminLevel);
    Role userRole = Role("User", userLevel);

    mapping(address => User) users;
    mapping(uint => address) addresses;
    uint userCount = 0;

    constructor() public {
        owner = msg.sender;
        addresses[userCount] = owner;
        users[owner] = User(owner, "Bayram ALACAM", adminRole);
        userCount++;
    }

    // Kullanıcı kayıtlı mı?
    function isRegistered(address _addr) public view returns(bool) {
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
    function getUser(address _addr) public view returns(string memory name, uint roleLevel) {
        require(isRegistered(_addr), "ERR_GET_MY_PROFILE");
        return (users[_addr].name, users[_addr].role.level);
    }
    
    // Kullanıcı yetkisini değiştir
    function setUserRole(address _addr, uint _roleLevel) public onlyAdminRole {
        // Sistem sahibi kendi yetkisini değiştiremez
        require(_addr != owner, "ERR_SET_USER_ROLE_1");
        // Admin ve User dışındaki yetkileri kabul etme
        require(_roleLevel == userLevel || _roleLevel == adminLevel, "ERR_SET_USER_ROLE_2");
        if (_roleLevel == 10) users[_addr].role = adminRole;
        else users[_addr].role = userRole;
    }
    
    // Tüm kullanıcılar
    function getUsers() public view returns(address[] memory) {
        address[] memory _addresses = new address[](userCount);
        for (uint i = 0; i < userCount; i++) {
            _addresses[i] = addresses[i];
        }
        return _addresses;
    }
    
    // Sadece Admin yetkisi olan işlem yapabilsin
    modifier onlyAdminRole(){
        require(users[msg.sender].role.level == adminLevel, "ERR_ONLY_ADMIN_ROLE");
        _;
    }
}

contract Votes is Users {
    
    uint public voteCount = 0;
    
    struct Vote {
        uint id;
        string subject;
        string detail;
        uint startDate;
        uint endDate;
        uint status;
    }
    
    uint closedStatus = 0;
    uint openStatus = 1;
    uint freezeStatus = 2;
    
    mapping(uint => Vote) public votes;

    
    struct userVote {
        address addr;
        uint voteId;
        bool vote;
    }
    
    uint usedVoteCount = 0;
    mapping(uint => userVote) public usedVotes;
    
    // Oy kullan
    function useVote(uint _id, bool _vote) public {
        address _addr = msg.sender;
        // Kayıtlı değilse oy kullanamaz
        require(isRegistered(_addr), "ERR_USE_VOTE_1");
        // Bulunmayan oylama kullanılamaz
        require(votes[_id].id != 0, "ERR_USE_VOTE_2");
        // Daha önce oy kullanıldıysa kullanılamaz
        for (uint i = 1; i <= usedVoteCount; i++) {
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
    function usedVoteList(address _addr) public view returns(uint[] memory) {
        uint count = 0;
        uint index = 0;
        for (uint i = 1; i <= usedVoteCount; i++) {
            if (address(usedVotes[i].addr) == address(_addr)) {
                count++;
            }
        }
        uint[] memory ids = new uint[](count);
        for (uint i = 1; i <= usedVoteCount; i++) {
            if (address(usedVotes[i].addr) == address(_addr)) {
                ids[index] = i;
                index++;
            }
        }
        return ids;
    }
    
    // Kullanılan oy bilgisi
    function usedVote(uint _id) public view returns(bool) {
        // Böyle bir kullanılan oy yoksa hata döndür
        require(usedVotes[_id].addr != address(0), "ERR_USED_VOTE");
        return usedVotes[_id].vote;
    }
    
    // Evet olarak kullanılan oy sayısı
    function usedVoteYes(uint _id) public view returns (uint _count) {
        // Böyle bir oylama yoksa sonuç alamaz
        require(votes[_id].id != 0, "ERR_USED_VOTES_YES");
        uint count = 0;
        for (uint i = 1; i <= usedVoteCount; i++) {
            if (usedVotes[i].voteId == _id && usedVotes[i].vote == true) {
                count++;
            }
        }
        return count;
    }
    
    // Hayır olarak kullanılan oy sayısı
    function usedVoteNo(uint _id) public view returns (uint _count) {
        // Böyle bir oylama yoksa sonuç alamaz
        require(votes[_id].id != 0, "ERR_USED_VOTES_YES");
        uint count = 0;
        for (uint i = 1; i <= usedVoteCount; i++) {
            if (usedVotes[i].voteId == _id && usedVotes[i].vote == false) {
                count++;
            }
        }
        return count;
    }

    // Oylama oluştur
    function createVote(string memory _subject, string memory _detail, uint _endDate) public onlyAdminRole  {
        uint _startDate = block.timestamp;
        require(_endDate >= _startDate, "ERR_CREATE_VOTE");
        voteCount++;
        votes[voteCount] = Vote(voteCount, _subject, _detail, _startDate, _endDate, openStatus);
    }
    
    // Bir oyun bilgisini getir
    function getVote(uint _id) public view returns(uint id, string memory subject, string memory detail, uint startDate, uint endDate, uint status) {
        require(votes[_id].id != 0, "ERR_GET_VOTE");
        return (votes[_id].id, votes[_id].subject, votes[_id].detail, votes[_id].startDate, votes[_id].endDate, votes[_id].status);
    }
    
    // Oylama durumunu değiştir
    function setVoteStatus(uint _id, uint _status) public onlyAdminRole {
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