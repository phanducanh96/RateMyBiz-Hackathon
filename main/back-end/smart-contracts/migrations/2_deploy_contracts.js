const ProfileDetail = artifacts.require("./ProfileDetail.sol");

module.exports = function (deployer, network, accounts) {
    deployer.deploy(ProfileDetail, accounts[0], { from: accounts[0] });
    deployer.deploy(ProfileDetail, accounts[1], { from: accounts[1] });
};