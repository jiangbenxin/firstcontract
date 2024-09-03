// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "hardhat/console.sol";
import "./Storage.sol";

contract A {
    // uint a;
    function setA(uint _a) public {
        Appstorage storage s = Storage.get();
        s.a = _a;
    }

    function getA() public view returns (uint) {
        Appstorage storage s = Storage.get();
        return s.a;
    }
}

contract B {
    // address ContractA;
    // uint a;
    // uint8 c;
    // uint8 d;
    // Appstorage s;

    constructor(address _ContractA) {
        Appstorage storage s = Storage.get();
        s.a = 1;
        s.c = 0x45;
        s.d = 0xF5;
        s.ContractA = _ContractA;
    }

    function setB(uint _a) public {
        Appstorage storage s = Storage.get();
        s.a = _a;
        s.ContractA.delegatecall(
            abi.encodeWithSignature("setA(uint256)", _a + 1)
        );
    }

    function getB() public view returns (uint) {
        Appstorage storage s = Storage.get();
        return s.a;
    }
}
