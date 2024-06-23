// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 storeNumber;

    function writeNum(uint256 _num) public {
        storeNumber = _num;
    }

    function readNum() public view returns (uint256) {
        return storeNumber;
    }
}
