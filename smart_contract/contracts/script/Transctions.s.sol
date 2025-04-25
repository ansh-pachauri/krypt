// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Transctions} from "../src/Transctions.sol";


contract DeployScript is Script {
    Transctions public transctions;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        console.log("Deploying Transctions contract...");
        Transctions transction = new Transctions();
        
        console.log("Transctions contract deployed at address: ", address(transction));

        vm.stopBroadcast();
    }
}
