// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Hero {
    enum Class2 {
        Healer,
        Barbarian
    }
    function createHero(Class2 _class) public payable  {
        require(
            msg.value>=0.05 ether,
            "Please send more money, at least 0.05 ether"
        );
    }
}