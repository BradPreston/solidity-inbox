pragma solidity ^0.4.17;

// contract code will go here
contract Inbox {
  string public message; // storage variable

  function Inbox(string initialMessage) public { // constructor | automatically called once the contract is called
    message = initialMessage;
  }
  
  function setMessage(string newMessage) public {
    message = newMessage;
  }
}