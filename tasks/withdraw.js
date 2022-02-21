// npx hardhat withdraw --amount <STRING> --contract-address <STRING> --mnemonic <STRING> --recipient-address <STRING> --network localhost
task("withdraw", "Withdraw all money to Signer on Rinkeby")
  .addParam("contractAddress", "Contract address")
  .addParam("recipientAddress", "Recipient address")
  .addParam("mnemonic", "The contract address on Rinkeby")
  .addParam("amount", "Amount to send")
  .setAction(async (taskArgs) => {
    const contract = require("../artifacts/contracts/Donation.sol/Donate.json");
    const provider = new ethers.getDefaultProvider("http://localhost:8545");
    const signer = new ethers.Wallet(taskArgs.mnemonic, provider);

    const donationContract = new ethers.Contract(
      taskArgs.contractAddress, 
      contract.abi, 
      signer
    );

    await donationContract.withdrawToSpecifiedWallet(taskArgs.recipientAddress, ethers.utils.parseEther(taskArgs.amount));
  });

module.exports = {};
