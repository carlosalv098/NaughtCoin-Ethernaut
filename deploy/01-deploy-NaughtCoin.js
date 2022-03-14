const { ethers } = require("hardhat");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments;
    const {deployer, user1,} = await getNamedAccounts();
    log('Deploying NaughtCoin...')
    const naughtCoin = await deploy("NaughtCoin", {
        from: deployer,
        args: [user1],
        log: true
    })
}
module.exports.tags = ["all"];