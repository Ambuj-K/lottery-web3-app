const main = async() => {
    
    // initialise a few accts to send waves from locally
    
    const [owner, randomUser, randomUser1] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

    // add ether for local testing
    
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    
    // wait for deployment on local hardhat dev env
    
    await waveContract.deployed();

    // log contract address and owner acct of hardhat
    
    console.log("WaveFactory Deployed to ", waveContract.address);
    console.log("WaveFactory deployed by ", owner.address);
    
    // log totalwaves 
    
    let waveCount;
    waveCount = await waveContract.displayTotalWaves();
    
    // log contract balance before/after each wave test

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );
    
    // send wave
    
    let waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait();

    // log total waves
    
    waveCount = await waveContract.displayTotalWaves();

    waveTxn = await waveContract.connect(randomUser).wave("A message!");
    await waveTxn.wait();
    
    // log contract balance before/after each wave test

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    waveTxn = await waveContract.connect(randomUser1).wave("Another message!");
    await waveTxn.wait();
    
    // log contract balance before/after each wave test

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    waveTxn = await waveContract.connect(randomUser).wave("A message!");
    await waveTxn.wait();
    
    // log contract balance before/after each wave test

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    waveCount = await waveContract.displayTotalWaves();

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
};

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch(error){
        console.log("error",error);
        process.exit(1);
    }
};

runMain();
