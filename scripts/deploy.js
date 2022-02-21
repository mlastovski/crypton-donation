const hre = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners(); //get the account to deploy the contract
  
    console.log("Deploying contracts with the account: ", deployer.address); 
  
    const DonationContract = await hre.ethers.getContractFactory("Donate"); // Getting the Contract
    const donationContract = await DonationContract.deploy(); //deploying the contract
  
    await donationContract.deployed(); // waiting for the contract to be deployed
  
    console.log("Donation deployed to:", donationContract.address); // Returning the contract address on the rinkeby
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); // Calling the function to deploy the contract 
