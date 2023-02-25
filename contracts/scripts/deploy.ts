import { ethers } from "hardhat";

async function main() {
  const OrangeVerifiedCredential = await ethers.getContractFactory("OrangeVerifiedCredential");
  const lock = await OrangeVerifiedCredential.deploy();

  await lock.deployed();

  console.log(`OrangeVerifiedCredential deployed to ${lock.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
