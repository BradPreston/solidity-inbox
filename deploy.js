// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { bytecode, interface } = require('./compile');
require('dotenv').config();

const provider = new HDWalletProvider(
  process.env.RINKEBY_MNEMONIC,
  process.env.NETWORK_URL
);
const web3 = new Web3(provider);