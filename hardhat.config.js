require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("dotenv").config({path: __dirname + '/devcontainer.env'});
require("@nomiclabs/hardhat-web3");
require("./tasks/donate");
require("./tasks/contributors");
require("./tasks/get_total_amount_by_address");
require("./tasks/balance");
require("./tasks/withdraw");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const INFURA_URL = process.env.INFURA_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : []
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
