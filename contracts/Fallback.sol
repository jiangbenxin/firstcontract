// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "hardhat/console.sol";

interface IFallback {
    function count() external;
}

contract Fallback {

    function foo() internal pure {
        console.log("foo was called");
    }

   fallback() external payable {
        foo();
        console.log("fallback was called");
        revert("should not be there");
    }
}