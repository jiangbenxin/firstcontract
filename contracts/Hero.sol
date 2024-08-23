// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Hero {
    enum Class2 {
        Healer,
        Barbarian
    }

    mapping(address => uint[]) addressToHeroes;

    function getHeroes() public view returns (uint[] memory) {
        return addressToHeroes[msg.sender];
    }
    
    function getStrength(uint hero) public pure returns(uint ) {
        return (hero >> 2) & 0x1F;
    }
    function getHealth(uint hero) public pure returns(uint ) {
        return (hero >> 7) & 0x1F;
    }
    function getIntellect(uint hero) public pure returns(uint ) {
        return (hero >> 12) & 0x1F;
    }
    
    function getMagic(uint hero) public pure returns(uint ) {
        return (hero >> 17) & 0x1F;
    }
    function getDex(uint hero) public pure returns(uint ) {
        return (hero >> 22) & 0x1F;
    }
    function generateRandom() public view virtual returns (uint) {
        return uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp,msg.sender)));
    }
// strength,health,intellect,magic,dexterity
    function createHero(Class2 _class) public payable {
        require(
            msg.value >= 0.05 ether,
            "Please send more money, at least 0.05 ether"
        );
        uint[] memory stats = new uint[](5);
        stats[0] = 2;
        stats[1] = 7;
        stats[2] = 12;
        stats[3] = 17;
        stats[4] = 22;

        uint len = 5;
        uint hero = uint(_class);
        do{
            uint pos = generateRandom() % len;
            uint value = generateRandom() % (13 + len) + 1;
            hero |= value << stats[pos];
            len--;
            stats[pos] = stats[len];
        }while(len>0);

        addressToHeroes[msg.sender].push(hero);
    }
}
