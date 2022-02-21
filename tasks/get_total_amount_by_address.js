// npx hardhat total --contract-address <STRING> --contributor-address <STRING> --network localhost
task("total", "get donations sum of a certain address")
  .addParam("contractAddress", "Contract address")
  .addParam("contributorAddress", "Your address")
  .setAction(async (taskArgs) => {
    const contract = require("../artifacts/contracts/Donation.sol/Donate.json");
    const provider = new ethers.getDefaultProvider("http://localhost:8545");
    const donationContract = new ethers.Contract(taskArgs.contractAddress, contract.abi, provider);

    const result = await donationContract.getTotalAmountContributedByAddress(taskArgs.contributorAddress);
    console.log(ethers.utils.formatEther(result), "ETH");
  });

module.exports = {};
