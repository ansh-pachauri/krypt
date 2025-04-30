// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Transctions} from "../src/Transctions.sol";

contract CounterTest is Test {
    Transctions public transction;

    function setUp() public {
        transction = new Transctions();
        console.log("Deploying Transctions contract...");
    }

    
}