const ProfileDetail = artifacts.require("./ProfileDetail.sol");
const ProfileDetail2 = artifacts.require("./ProfileDetail2.sol");
const ProfileDetail3 = artifacts.require("./ProfileDetail3.sol");
const ProfileDetail4 = artifacts.require("./ProfileDetail4.sol");
const ProfileDetail5 = artifacts.require("./ProfileDetail5.sol");
const ProfileDetail6 = artifacts.require("./ProfileDetail6.sol");
const ProfileDetail7 = artifacts.require("./ProfileDetail7.sol");
const ProfileDetail8 = artifacts.require("./ProfileDetail8.sol");
const ProfileDetail9 = artifacts.require("./ProfileDetail9.sol");
const ProfileDetail10 = artifacts.require("./ProfileDetail10.sol");

module.exports = function (deployer, network, accounts) {
    deployer.deploy(ProfileDetail, accounts[0], { from: accounts[0] });
    deployer.deploy(ProfileDetail2, accounts[1], { from: accounts[1] });
    deployer.deploy(ProfileDetail3, accounts[2], { from: accounts[2] });
    deployer.deploy(ProfileDetail4, accounts[3], { from: accounts[3] });
    deployer.deploy(ProfileDetail5, accounts[4], { from: accounts[4] });
    deployer.deploy(ProfileDetail6, accounts[5], { from: accounts[5] });
    deployer.deploy(ProfileDetail7, accounts[6], { from: accounts[6] });
    deployer.deploy(ProfileDetail8, accounts[7], { from: accounts[7] });
    deployer.deploy(ProfileDetail9, accounts[8], { from: accounts[8] });
    deployer.deploy(ProfileDetail10, accounts[9], { from: accounts[9] });
};