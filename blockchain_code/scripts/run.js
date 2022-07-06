const main = async() => {
    const [owner, randomUser, randomUser1] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();

    console.log("WaveFactory Deployed to ", waveContract.address);
    console.log("WaveFactory deployed by ", owner.address);

    let waveCount;
    waveCount = await waveContract.displayTotalWaves();

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );
    
    let waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait();

    waveCount = await waveContract.displayTotalWaves();

    waveTxn = await waveContract.connect(randomUser).wave("A message!");
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    waveTxn = await waveContract.connect(randomUser1).wave("Another message!");
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    waveTxn = await waveContract.connect(randomUser).wave("A message!");
    await waveTxn.wait();

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
