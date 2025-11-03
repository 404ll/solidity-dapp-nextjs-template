import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const networks = {};

const sepoliaRpcUrl = process.env.SEPOLIA_RPC_URL;
const sepoliaPk = process.env.SEPOLIA_PK;

if (sepoliaRpcUrl && sepoliaPk) {
  networks.sepolia = {
    url: sepoliaRpcUrl,
    accounts: [sepoliaPk],
  };
}

/** @type import('hardhat/config').HardhatUserConfig */
const config = {
  solidity: "0.8.28",
  networks,
};
export default config;

