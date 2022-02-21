// npx hardhat donate --amount <STRING> --contract-address <STRING> --contributor-address <STRING> --network localhost
task("donate", "Make a donation")
  .addParam("contractAddress", "Contract address")
  .addParam("contributorAddress", "Your address")
  .addParam("amount", "Amount to send")
  .setAction(async (taskArgs) => {
	const signersArray = await ethers.getSigners();
	const length = signersArray.length;

	let signerIndex = []
	for (let i = 0; i < length; i++) {
	  obj = signersArray[i];
	  if (obj.address.toLowerCase() == taskArgs.contributorAddress) {
		signerIndex.push(i);
	  }
	}

	signer = signersArray[signerIndex];

	const sendTx = await signer.sendTransaction({
		to: taskArgs.contractAddress,
		value: ethers.utils.parseEther(taskArgs.amount)
	});

	await sendTx.wait();
  });

module.exports = {};
