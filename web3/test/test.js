// REPORT_GAS=true npx hardhat test test/test.js
// npx hardhat coverage --testfiles test/test.js
const hre = require('hardhat')
const { utils, ethers, network } = require('hardhat');
const { expect } = require('chai');
const helpers = require("@nomicfoundation/hardhat-network-helpers");
const { BigNumber } = require("@ethersproject/bignumber");
const { StandardMerkleTree } = require('@openzeppelin/merkle-tree');
const fs = require('fs');
const exp = require('constants');

const Contract = 'NFT';

const minterRole = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('MINTER_ROLE'));

let NFT;
let nft;
let nftAddress;

let now;
let tx;
let answer;

describe('test', function () {
    before(async function () {
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
    });

    it('should mint a token', async function () {
        const [deployer] = await ethers.getSigners();
        const balance = await nft.balanceOf(deployer.address);
        expect(balance).to.equal(1);
    });
});