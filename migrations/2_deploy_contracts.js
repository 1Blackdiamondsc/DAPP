var Procurement = artifacts.require("./Procurement.sol");

module.exports = function(deployer) {
  deployer.deploy(Procurement);
};
