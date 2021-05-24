import { HardhatUserConfig } from 'hardhat/config';

// import * as dotenv from "dotenv";
// dotenv.config();

const alchemyKey = 'EuD-FVgI2gMBGf0aypDghsPHYWHB9nhn';
const infuraApiKey = '37bd907f93a146679960d54e729cd51a';
const mnemonic = 'blood depth speak upper carpet rich nation tooth coil cousin jealous antique';

const networks: HardhatUserConfig['networks'] = {
  coverage: {
    url: 'http://127.0.0.1:8555',
    blockGasLimit: 200000000,
    allowUnlimitedContractSize: true,
  },
  localhost: {
    chainId: 1,
    url: 'http://127.0.0.1:8545',
    allowUnlimitedContractSize: true,
  },
};

// if (process.env.FORK_ENABLED == "true") {
  networks.hardhat = {
    chainId: 1,
    forking: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${alchemyKey}`,
      // blockNumber: 11054830
    },
    accounts: {
      mnemonic,
    },
  };
// }  else {
//   networks.hardhat = {
//     allowUnlimitedContractSize: true,
//   };
// }
  
if (infuraApiKey && mnemonic) {
  networks.kovan = {
    url: `https://kovan.infura.io/v3/${infuraApiKey}`,
    accounts: {
      mnemonic,
    },
  };
  
  networks.ropsten = {
    url: `https://ropsten.infura.io/v3/${infuraApiKey}`,
    accounts: {
      mnemonic,
    },
  };

  networks.rinkeby = {
    url: `https://rinkeby.infura.io/v3/${infuraApiKey}`,
    accounts: {
      mnemonic,
    },
  };

  networks.mainnet = {
    url: `https://eth-mainnet.alchemyapi.io/v2/${alchemyKey}`,
    accounts: {
      mnemonic,
    },
  };
} else {
  console.warn('No infura or hdwallet available for testnets');
}

export default networks;
