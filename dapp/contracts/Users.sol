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
    
    // Kullanıcı bilgisini getir
    function getUser(address _addr) public view returns(string memory name, uint roleLevel) {
        require(isRegistered(_addr), "ERR_GET_MY_PROFILE");
        return (users[_addr].name, users[_addr].role.level);
    }
    
    // Tüm kullanıcılar
    function getUsers() public view returns(address[] memory) {
        address[] memory _addresses = new address[](userCount);
        for (uint i = 0; i < userCount; i++) {
            _addresses[i] = addresses[i];
        }
        return _addresses;
    }


}