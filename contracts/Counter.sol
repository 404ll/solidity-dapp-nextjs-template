// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Counter {
    uint256 public x;

    constructor() {
        x = 0;
    }

    function inc() public {
        x += 1;
    }

    function dec() public {
        x -= 1;
    }

    function set(uint256 _x) public {
        x = _x;
    }
}
