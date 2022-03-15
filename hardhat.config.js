// require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

const RINKEBY_API_KEY = process.env.RINKEBY_API_KEY;
const MNEMONIC = process.env.MNEMONIC;

module.exports = {
  namedAccounts: {
    deployer:{
      default: 0
    },
    user1: {
      default: 1
    }
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    rinkeby: {
      url: RINKEBY_API_KEY,
      accounts: {
        mnemonic: MNEMONIC
      },
      gas: 2100000,
      gasPrice: 8000000000
    }
  },
  solidity: "0.8.0",
};
