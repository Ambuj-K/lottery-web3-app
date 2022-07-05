const main = async() => {
    const [owner, randomUser, randomUser1] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("WaveFactory Deployed to ", waveContract.address);
    console.log("WaveFactory deployed by ", owner.address);

    let waveCount;
    waveCount = await waveContract.displayTotalWaves();
    
    let waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait();

    waveCount = await waveContract.displayTotalWaves();

    waveTxn = await waveContract.connect(randomUser).wave("A message!");
    await waveTxn.wait();

    waveTxn = await waveContract.connect(randomUser1).wave("Another message!");
    await waveTxn.wait();

    waveTxn = await waveContract.connect(randomUser).wave("A message!");
    await waveTxn.wait();

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