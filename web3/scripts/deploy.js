// npx hardhat run scripts/deploy.js >> log.txt
const hre = require("hardhat");
const { utils, ethers, network } = require('hardhat');

const Contract = 'NFT';

const minterRole = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('MINTER_ROLE'));

let NFT;
let nft;
let nftAddress;

let now;
let tx;
let answer;

async function main() {
    now = new Date();
    console.log(`[${now.toLocaleString()}] Command: ${command}`);
    console.log(`[${now.toLocaleString()}] Starting script...`);

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    NFT = await ethers.getContractFactory(Contract);
    nft = await NFT.deploy();
    await nft.deployed();
    nftAddress = nft.address;

    console.log("NFT deployed to:", nftAddress);

    tx = await nft.connect(deployer).mint(deployer.address);
    await tx.wait();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });