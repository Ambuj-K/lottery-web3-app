// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal{
    uint256 totalWaves;
    string message;
    mapping (address=>uint256) wavingUserCounts;
    uint256 timestamp;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    Wave[] waves;

    constructor() {
        console.log("Git Project for Web3 starters");
    }

    function wave(string memory _message) public{
        console.log("adding wave from ",msg.sender);
        totalWaves+=1;
        wavingUserCounts[msg.sender]+=1; 
        waves.push(Wave(msg.sender, _message, block.timestamp));
        console.log("wave counter of yours ", wavingUserCounts[msg.sender]);
        emit NewWave(msg.sender, block.timestamp, _message);    
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function displayTotalWaves() public view returns (uint256){
        console.log("total waves counter ", totalWaves);
        return totalWaves;
    }

}