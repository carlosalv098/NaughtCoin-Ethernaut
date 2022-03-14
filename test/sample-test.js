const { expect } = require("chai");
const { ethers, deployments } = require("hardhat");
const { default: deployNaughtCoin } = require("../deploy/01-deploy-NaughtCoin");


describe("Naught Coin", async() => {

  let naughtCoin;

  beforeEach(async() => {
    await deployments.fixture(["all"]);
    naughtCoin = await ethers.getContract("NaughtCoin");
  })

  it("Should return the new greeting once it's changed", async function () {

    const [deployer, user1, user2] = await ethers.getSigners();
    expect(await naughtCoin.player()).to.equal(user1.address);

  });
});



    // install hardhat deploy
    // create deploy scripts
    // export them and import here
    // try hardhat gas reporter
    // try hardhat solidity-coverage
    // try hardhat node 
    // try hardhat console to interact with the smart contract