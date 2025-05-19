import { ethers } from 'hardhat';
import { Storage__factory } from '../typechain';

const SCAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
const signer = new ethers.Wallet(
  '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
  provider,
);
const contract = Storage__factory.connect(SCAddress, signer);

async function main() {
  await (await contract.deposit({ value: ethers.parseEther('1.0') })).wait();

  await contract.transfer(
    '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
    1_000_000_000,
  );

  console.log('My Wallet: ', await contract.getBalance(signer.address));

  console.log(
    'Target Wallet: ',
    await contract.getBalance('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'),
  );
}

main();
