// npx hardhat balance --address <ADDRESS> --network localhost
task("balance", "Prints balance of given address")
  .addParam("address", "Address to print")
  .setAction(async (taskArgs) => {
    const balance = web3.utils.fromWei(
      await web3.eth.getBalance(taskArgs.address), 'ether');
    console.log(balance, "ETH");
  });

module.exports = {};
