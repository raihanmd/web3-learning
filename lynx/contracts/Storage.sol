// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Storage is Initializable {
    uint256 private storedData;

    mapping(address => uint256) public balances;

    function initialize(uint256 _initialValue) public initializer {
        storedData = _initialValue;
    }

    function deposit() public payable {
        require(msg.value > 0, "Must send ether");
        balances[msg.sender] += msg.value;
    }

    function transfer(address recipient, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Not enough balance");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
    }

    function getBalance(address account) public view returns (uint256) {
        return balances[account];
    }

    function set(uint256 data) public {
        storedData = data;
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}
