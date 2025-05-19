#!/usr/bin/env node
// @ts-ignore
import meow from 'meow';
import { ethers } from 'hardhat';
import { Storage__factory } from '../typechain';

const SCAddress = '0xa513e6e4b8f2a923d98304ec87f64353c4d5c853';
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

const signer = new ethers.Wallet(
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  provider,
);

const contract = Storage__factory.connect(SCAddress, signer);

const cli = meow(
  `
  Usage
    $ lynx <command> [...args]

  Commands
    get                          Get storedData
    set <value>                  Set storedData
    deposit <amount>             Deposit ETH (in wei)
    balance <address>            Get balance of address
    transfer <to> <amount>       Transfer token

  Examples
    $ lynx get
    $ lynx set 100
    $ lynx deposit 1000000000000000000
    $ lynx balance 0xAbc...
    $ lynx transfer 0xAbc... 500
`,
);

async function main() {
  const [command, ...args] = cli.input;

  switch (command) {
    case 'get': {
      const value = await contract.get();
      console.log('Stored value:', value.toString());
      break;
    }
    case 'set': {
      const value = args[0];
      if (!value) return console.error('Value is required');
      const tx = await contract.set(value);
      await tx.wait();
      console.log('Stored value set to:', value);
      break;
    }
    case 'deposit': {
      const amount = args[0];
      if (!amount) return console.error('Amount is required');
      const tx = await contract.deposit({ value: BigInt(amount) });
      await tx.wait();
      console.log('Deposited:', amount, 'wei');
      break;
    }
    case 'balance': {
      const address = args[0];
      if (!address) return console.error('Address is required');
      const balance = await contract.getBalance(address);
      console.log('Balance:', ethers.formatEther(balance));
      break;
    }
    case 'transfer': {
      const [to, amount] = args;
      if (!to || !amount) return console.error('To and amount required');
      const tx = await contract.transfer(to, amount);
      await tx.wait();
      console.log(`Transferred ${amount} to ${to}`);
      break;
    }
    default:
      console.log('Unknown command. Use --help for usage.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
