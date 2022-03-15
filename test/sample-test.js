const { expect } = require("chai");
const { toUtf8CodePoints } = require("ethers/lib/utils");
const { ethers, deployments } = require("hardhat");
const { default: deployNaughtCoin } = require("../deploy/01-deploy-NaughtCoin");


describe("Naught Coin", async() => {

  let naughtCoin;

  beforeEach(async() => {
    await deployments.fixture(["all"]);
    naughtCoin = await ethers.getContract("NaughtCoin");
  })

  it("User2 should withdraw all the balance from user1", async function () {

    const [deployer, user1, user2] = await ethers.getSigners();
    expect(await naughtCoin.player()).to.equal(user1.address);
    expect(ethers.utils.formatEther(await naughtCoin.balanceOf(user1.address))).to.equal('1000000.0');

    console.log(`User1 balance: ${ethers.utils.formatEther(await naughtCoin.balanceOf(user1.address))}`);
    console.log(`User2 balance: ${ethers.utils.formatEther(await naughtCoin.balanceOf(user2.address))}`);

    let tx = await naughtCoin.connect(user1).approve(user2.address, ethers.utils.parseUnits('1000000'));
    await tx.wait();

    expect(ethers.utils.formatEther(await naughtCoin.allowance(user1.address, user2.address))).to.equal('1000000.0')

    console.log(`\nUser 2 allowance: ${ethers.utils.formatEther(await naughtCoin.allowance(user1.address, user2.address))}`);

    await naughtCoin.connect(user2).transferFrom(user1.address, user2.address, ethers.utils.parseUnits('1000000'));

    console.log(`\nUser1 balance: ${ethers.utils.formatEther(await naughtCoin.balanceOf(user1.address))}`);
    console.log(`User2 balance: ${ethers.utils.formatEther(await naughtCoin.balanceOf(user2.address))}`);

    console.log(`\nUser 2 allowance: ${ethers.utils.formatEther(await naughtCoin.allowance(user1.address, user2.address))}`);

    expect(ethers.utils.formatEther(await naughtCoin.balanceOf(user2.address))).to.equal('1000000.0');
    expect(ethers.utils.formatEther(await naughtCoin.balanceOf(user1.address))).to.equal('0.0');

  });
});



