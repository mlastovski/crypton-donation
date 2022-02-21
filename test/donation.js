const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Donation contract", function () {
  let Donate;
  let donationContract;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    Donate = await ethers.getContractFactory("Donate");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    donationContract = await Donate.deploy();
    await donationContract.deployed();
  });

  describe("Deployment", function () {
    it("Checks if the contract is deployed", () => { 
      assert(donationContract.address);
    });

    it("Should set the right owner", async function () {
      expect(await donationContract.creatorAddress()).to.equal(owner.address);
    });
  });

  describe("Balance", function () {
    it("Checks if the balance of the contract is equal to total sum transacted", async function () {
      const contract = require("../artifacts/contracts/Donation.sol/Donate.json");

      const donationNew = new ethers.Contract(
        donationContract.address, 
        contract.abi, 
        owner
      );

      await donationNew;
      
      const tx = {
        to: donationContract.address,
        value: ethers.utils.parseEther('0.01')
      }

      const sendFirst = await owner.sendTransaction(tx);
      const sendSecond = await addr2.sendTransaction(tx);
      await sendFirst;
      await sendSecond;
      const balance = await ethers.provider.getBalance(donationContract.address);
      expect(ethers.utils.formatEther(balance)).to.equal('0.02');
    });
  });
});
