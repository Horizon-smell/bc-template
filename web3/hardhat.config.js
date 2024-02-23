require("@nomicfoundation/hardhat-toolbox");
require('hardhat-abi-exporter');
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: ".hardhat",
    artifacts: "./artifacts",
    node_modules: "./node_modules",
  },
  networks: {
    mainnet: {
      url: "https://mainnet.infura.io/v3/" + process.env.INFURA_KEY,
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
    goerli: {
      // deploy: [contracts/flatten/whitelist.sol],
      url: "https://goerli.infura.io/v3/" + process.env.INFURA_KEY,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/` + process.env.INFURA_KEY,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/` + process.env.INFURA_KEY,
      accounts: [`${process.env.PRIVATE_KEY}`],
    }
 },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API,
    }, 
    customChains: [
      {
        network: "goerli",
        chainId: 5,
        urls: {
          apiURL: "https://api-goerli.etherscan.io/api",
          browserURL: "https://goerli.etherscan.io"
        }
      }
    ]
  },
  // REPORT_GAS=true npx hardhat
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    currency: "JPY",
    gasPriceApi:
      "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
      // "https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    // token: "MATIC"
  },
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 0,
    format: "json",
  },
};