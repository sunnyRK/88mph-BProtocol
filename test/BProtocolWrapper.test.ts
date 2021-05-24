
const { expect } = require("chai");
const { BigNumber, Wallet } = require("ethers");
const { formatEther, parseEther } =require('@ethersproject/units');
const daiAbi = require('../abis/daiAbi.json');
const hre = require("hardhat");
const BPoolMarket = require('../artifacts/contracts/BPool/BPoolCompoundERC20Market.sol/BPoolCompoundERC20Market.json');
const IBPool = require('../artifacts/contracts/BPool/imports/IBPool.sol/IBPool.json');

describe("deployed Contract on Mainnet fork", function() {
  let accounts: any
  let maxValue: any
  let accountToImpersonate: any
  let daiAddress:  any
  let bToken: any
  let bComptroller: any
  let signer: any
  let daiContract: any
  let impersonateBalanceBefore: any
  let BpoolMarket_Instance: any
  let IBPoolIBPoolInstance: any
  let compToken: any

  describe('create functions', () => {
    before(async () => {
      maxValue = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
      accounts = await hre.ethers.getSigners();

      // Mainnet addresses
      accountToImpersonate = '0xF977814e90dA44bFA03b6295A0616a897441aceC' // Dai rick address
      daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // $dai
      bToken = '0x0b1B0Aa805e48af767a6ec033984f9d7bffb56dd' // $nTokenDai
      bComptroller = '0x9dB10B9429989cC13408d7368644D4A1CB704ea3'
      compToken = ''
      await hre.network.provider.request({
          method: "hardhat_impersonateAccount",
          params: [accountToImpersonate]
      })
      signer = await hre.ethers.provider.getSigner(accountToImpersonate)
      daiContract = new hre.ethers.Contract(daiAddress, daiAbi, signer)
      impersonateBalanceBefore = await daiContract.balanceOf(accountToImpersonate)
      IBPoolIBPoolInstance = new hre.ethers.Contract(bToken, IBPool.abi, signer)
      console.log(impersonateBalanceBefore.toString());
    });

    it('#1 Deposit', async function() {
      const BpoolMarketInstance = await hre.ethers.getContractFactory('BPoolCompoundERC20Market', signer);
      BpoolMarket_Instance = await BpoolMarketInstance.connect(signer).deploy();
      await BpoolMarket_Instance.initialize(
        bToken,
        bComptroller,
        accountToImpersonate,
        accountToImpersonate,
        daiAddress
      );
      await daiContract.connect(signer).approve(BpoolMarket_Instance.address, maxValue);
      
      await BpoolMarket_Instance.connect(signer).deposit('100000000000000000000000000')

      let bal = await IBPoolIBPoolInstance.balanceOf(BpoolMarket_Instance.address)
      console.log(bal.toString());
      
    });


    it('#2 ClaimComp', async function() {
      await hre.ethers.provider.send("evm_setNextBlockTimestamp", [1823067600]) // Monday, 7 June 2021 12:06:40
      await hre.ethers.provider.send("evm_mine")

      let compContract = new hre.ethers.Contract('0xc00e94Cb662C3520282E6f5717214004A7f26888', daiAbi, signer)
      await BpoolMarket_Instance.connect(signer).claimRewards()
      
      let compbal = await compContract.balanceOf(accountToImpersonate)
      console.log('compbal: ', compbal.toString());
    });

    it('#3 Withdraw', async function() {
      await BpoolMarket_Instance.connect(signer).withdraw('100000000000000000000000000')
      let bal = await IBPoolIBPoolInstance.balanceOf(BpoolMarket_Instance.address)
      console.log(bal.toString());
    });

  });
});
