pragma solidity >=0.4.22 <0.9.0;

contract Register {

    struct User {
        address addr;
        string name;
    }
    
    address owner;
    
    mapping(address => User) users;
    uint public userCount = 0;
    
    // Kullanıcı kayıtlı mı?
    function isRegistered(address _addr) public view returns(bool) {
        return users[_addr].addr != address(0);
    }
    
    // Kullanıcı kayıt et
    function register(string memory _name) public {
        address _addr = msg.sender;
        require(!isRegistered(_addr), "ERR_IS_REGISTERED");
        users[_addr] = User(_addr, _name);
        userCount++;
    }
    
    constructor() public {
        owner = msg.sender;
    }
}