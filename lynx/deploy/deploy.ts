import { ethers, upgrades } from 'hardhat';
import { GetContractTypeFromFactory } from '../typechain/common';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  // Deploy kontrak yang dapat diupgrade
  const StorageUpgradeable = (await ethers.getContractFactory(
    'Storage',
  )) as unknown as GetContractTypeFromFactory<Storage>;
  console.log('Deploying StorageUpgradeable...');
  await upgrades.deployProxy(StorageUpgradeable, [42], {
    initializer: 'initialize',
  });
  console.log('StorageUpgradeable deployed');
}

main();
