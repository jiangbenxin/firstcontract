import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter"
const dotenv = require('dotenv')
dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks:{
    hardhat:{
      chainId:31337
    },
    // sepolia_eth:{
    //   url:`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    //   accounts:[(`${process.env.PRIVATE_KEY}` as any)]
    // }
  },
  gasReporter: {
    enabled: false
  }
};

export default config;
