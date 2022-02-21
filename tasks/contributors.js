// npx hardhat contributors --contract-address <STRING> --network localhost
task("contributors", "Prints all of the contributor addresses")
  .addParam("contractAddress", "Contract address")
  .setAction(async (taskArgs) => {
    const contract = require("../artifacts/contracts/Donation.sol/Donate.json");
    const provider = new ethers.getDefaultProvider("http://localhost:8545");
    const donationContract = new ethers.Contract(taskArgs.account, contract.abi, provider);

    const result = await donationContract.getAllContributors();
    console.log(result);
  });

module.exports = {};
