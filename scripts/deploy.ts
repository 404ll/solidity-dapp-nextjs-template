import { ethers } from "hardhat";

async function main() {
  console.log("Deploying Counter contract...");

  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();

  await counter.waitForDeployment();

  const address = await counter.getAddress();
  console.log("Counter deployed to:", address);
  console.log("Please update your .env.local file with this address:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
