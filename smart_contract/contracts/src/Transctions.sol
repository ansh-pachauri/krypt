// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract Transctions {
    uint256 public transcationCount;

    event Transfer(
        address from,
        address receiver,
        uint amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct TransferStruct {
        address from;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transcationCount +=1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));
         
         //making the transction event
         emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);

    }

    function getAllTransctions()public view returns(TransferStruct[] memory){

    }

    function getTransctionCount()public view returns (uint256){

    }



}