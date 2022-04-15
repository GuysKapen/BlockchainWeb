// https://eth-ropsten.alchemyapi.io/v2/6NNG2o9kLHN4RmoB_GTb1ovy6D4LWMm1
require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async () => {
//   const accounts = await ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.13",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/6NNG2o9kLHN4RmoB_GTb1ovy6D4LWMm1",
      accounts: ['57701425ebea4f9606160143c621ef41a360fed2683ced595854987d663b028c']
    }
  }
};

