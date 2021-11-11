// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const { describe } = require('mocha');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';
const NEW_MESSAGE = 'This is a new message!';

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(
    JSON.parse(interface) // interface is the ABI
  )
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] }) // deploy starts to create a deployable contract
    .send({ from: accounts[0], gas: '1000000' }); // send deploys a contrct from web3 to the network
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address); // verify the deploy method is working
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call(); // call the method
    assert.equal(message, INITIAL_STRING);
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage(NEW_MESSAGE).send({ from: accounts[0] }); // send the method
    const message = await inbox.methods.message().call();
    assert.equal(message, NEW_MESSAGE);
  });
});
