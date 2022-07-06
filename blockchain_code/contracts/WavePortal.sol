// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal{
    uint256 totalWaves;
    string message;
    mapping (address=>uint256) wavingUserCounts;
    uint256 timestamp;
    
    // Event type to emit for each account that waves at us
    
    event NewWave(address indexed from, uint256 timestamp, string message);
    
    // Struct type to store details of the wave sent

    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }
    
    //Array to store all Wave Struct event data sent 
    
    Wave[] waves;

    constructor() payable{
        console.log("Constructor for the Wave and surprise wins app");
    }
    
    // wave function to add a total wave counter, emit event,
    // and maintain a per user wave counter
    // also send a minimum ether value for each wave
    
    function wave(string memory _message) public{
        console.log("adding wave from ",msg.sender);
        totalWaves+=1;
        wavingUserCounts[msg.sender]+=1; 
        waves.push(Wave(msg.sender, _message, block.timestamp));
        console.log("wave counter of yours ", wavingUserCounts[msg.sender]);
        emit NewWave(msg.sender, block.timestamp, _message);

        uint256 prizeAmount = 0.0001 ether;
        require(prizeAmount <= address(this).balance,
        "Trying to withdraw more money than the contract has.");
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");    
    }
    
    // returns the waves list of details of each wave
    
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
    
    // returns total waves sent to us
    
    function displayTotalWaves() public view returns (uint256){
        console.log("total waves counter ", totalWaves);
        return totalWaves;
    }

}
