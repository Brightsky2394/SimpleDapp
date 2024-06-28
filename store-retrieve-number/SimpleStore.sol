// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 public storedNum;

    function writeNum(uint256 _num) public {
        storedNum = _num;
    }

    function readNum() public view returns (uint256) {
        return storedNum;
    }
}
