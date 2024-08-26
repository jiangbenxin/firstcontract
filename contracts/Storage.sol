// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "hardhat/console.sol";
struct Appstorage {
   uint256 a;
   uint8 c;
   uint8 d;
   uint b;
   address ContractA;
}
library Storage {
   bytes32 constant KEY = keccak256("storage-local");
   function get() internal pure returns (Appstorage storage s) {
      bytes32 loc = KEY;
      assembly {
         s.slot := loc
      }
   }
}