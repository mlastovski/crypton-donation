//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Donate {
    address payable public creatorAddress;

    constructor() {
        creatorAddress = payable(msg.sender);
    }

    struct Contribution {
        address contributorAddress;
        uint256 amountContributed;
        bool exists;
    }

    mapping(address => Contribution) contributions;
    address[] contributionList;

    function contributionStructExists(address _contributorAddress) private view returns (bool) {
        return contributions[_contributorAddress].exists;
    }

    function addContribution(address _contributorAddress, uint256 _targetAmount) private {
        if (contributionStructExists(_contributorAddress)) revert();
        contributions[_contributorAddress].contributorAddress = _contributorAddress;
        contributions[_contributorAddress].amountContributed = _targetAmount;
        contributions[_contributorAddress].exists = true;
        contributionList.push(_contributorAddress);
    }

    function modifyContribution(address _contributorAddress, uint256 _targetAmount) private {
        if (!contributionStructExists(_contributorAddress)) revert();
        contributions[_contributorAddress].amountContributed += _targetAmount;
    }

    function donate() public payable {
        if (!contributionStructExists(msg.sender)) {
            addContribution(msg.sender, msg.value);
        } else {
            modifyContribution(msg.sender, msg.value);
        }
    }

    receive() external payable {
        if (!contributionStructExists(msg.sender)) {
            addContribution(msg.sender, msg.value);
        } else {
            modifyContribution(msg.sender, msg.value);
        }
    }

    function withdrawToSpecifiedWallet(address recipientAddress, uint256 amount) external payable {
        require(msg.sender == creatorAddress);
        payable(recipientAddress).transfer(amount);
    }

    function getAllContributors() public view returns (address[] memory) {
        return contributionList;
    }

    function getTotalAmountContributedByAddress(address _contributorAddress) public view returns (uint256) {
        return contributions[_contributorAddress].amountContributed;
    }
}
