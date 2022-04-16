const ProfileRating = artifacts.require("./ProfileRating.sol");

module.exports = function (deployer, network, accounts) {
    console.log(accounts[0]);
    deployer.deploy(ProfileRating, '0x65F744Ce44082b61A03da55a2Db541508557AD5B', { from: accounts[1] });
};