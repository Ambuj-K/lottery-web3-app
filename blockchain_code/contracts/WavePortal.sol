// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal{
    uint256 totalWaves;
    string message;
    mapping (address=>uint256) wavingUserCounts;

    mapping(address => uint256) public lastWavedAt;

    uint256 timestamp;

    uint256 private seed;
    
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
    
    // set a seed for managing probability of a win, overall per wave
    
    constructor() payable{
        console.log("Constructor for the Wave and surprise wins app");

        seed = (block.timestamp + block.difficulty) % 100;
    }
    
    // wave function to add a total wave counter, emit event,
    // and maintain a per user wave counter
    // also send a minimum ether value for each wave
    
    function wave(string memory _message) public{
        
        // prevent spamming limiting waves every 15 mins 

        require(
            lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m"
        );

        // prevent waving more than 10 times

        require(
            wavingUserCounts[msg.sender]<10,
            "Can't wave more than 10 times"
        );

        lastWavedAt[msg.sender] = block.timestamp;

        console.log("adding wave from ",msg.sender);
        totalWaves+=1;
        wavingUserCounts[msg.sender]+=1; 
        waves.push(Wave(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;

        console.log("Random # generated: %d", seed);

        console.log("wave counter of yours ", wavingUserCounts[msg.sender]);

        if (seed < 50) {
            console.log("%s won!", msg.sender);
            uint256 prizeAmount = 0.0001 ether;

            require(prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has.");

            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }    

        emit NewWave(msg.sender, block.timestamp, _message);
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
