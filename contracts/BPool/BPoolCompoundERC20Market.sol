// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.0;

import {
    SafeERC20Upgradeable
} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import {
    ERC20Upgradeable
} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {
    AddressUpgradeable
} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import {IMoneyMarket} from "../interfaces/IMoneyMarket.sol";
import {DecMath} from "../libs/DecMath.sol";
import {IComptroller, IBComptroller} from "./imports/IComptroller.sol";
import {IBPool} from "./imports/IBPool.sol";

// BackStop Protocol
contract BPoolCompoundERC20Market is IMoneyMarket {
    using DecMath for uint256;
    using SafeERC20Upgradeable for ERC20Upgradeable;
    using AddressUpgradeable for address;

    uint256 internal constant ERRCODE_OK = 0;

    IBPool public bToken;
    IComptroller public comptroller;
    address public rewards;
    ERC20Upgradeable public override stablecoin;

    function initialize(
        address _bToken,
        address _comptroller,
        address _rewards,
        address _rescuer,
        address _stablecoin
    ) external
     initializer 
    {
        __IMoneyMarket_init(_rescuer);

        // Verify input addresses
        require(
            _bToken.isContract() &&
                _comptroller.isContract() &&
                _rewards != address(0) &&
                _stablecoin.isContract(),
            "BPoolCompoundERC20Market: Invalid input address"
        );

        bToken = IBPool(_bToken);
        comptroller = IComptroller(_comptroller);
        rewards = _rewards;
        stablecoin = ERC20Upgradeable(_stablecoin);
    }

    function deposit(uint256 amount) external override onlyOwner {
        require(amount > 0, "BPoolCompoundERC20Market: amount is 0");

        // Transfer `amount` stablecoin from `msg.sender`
        stablecoin.safeTransferFrom(msg.sender, address(this), amount);

        // Deposit `amount` stablecoin into bToken
        stablecoin.approve(address(bToken), amount);
        require(
            bToken.mint(amount) == ERRCODE_OK,
            "BPoolCompoundERC20Market: Failed to mint bTokens"
        );
    }

    function withdraw(uint256 amountInUnderlying)
        external
        override
        onlyOwner
        returns (uint256 actualAmountWithdrawn)
    {
        require(
            amountInUnderlying > 0,
            "BPoolCompoundERC20Market: amountInUnderlying is 0"
        );

        // Withdraw `amountInUnderlying` stablecoin from bToken
        require(
            bToken.redeemUnderlying(amountInUnderlying) == ERRCODE_OK,
            "BPoolCompoundERC20Market: Failed to redeem"
        );

        // Transfer `amountInUnderlying` stablecoin to `msg.sender`
        stablecoin.safeTransfer(msg.sender, amountInUnderlying);

        return 0;
    }

    function claimRewards() external override {
        comptroller.claimComp(address(this));
        address compTokenAddress = IComptroller(IBComptroller(address(comptroller)).comptroller()).getCompAddress(); 
        ERC20Upgradeable comp = ERC20Upgradeable(compTokenAddress);
        comp.safeTransfer(rewards, comp.balanceOf(address(this)));
    }

    function totalValue() external override returns (uint256) {
        uint256 bTokenBalance = bToken.balanceOf(address(this));
        // Amount of stablecoin units that 1 unit of bToken can be exchanged for, scaled by 10^18
        uint256 bTokenPrice = bToken.exchangeRateCurrent();
        return bTokenBalance.decmul(bTokenPrice);
    }

    function incomeIndex() external override returns (uint256) {
        return bToken.exchangeRateCurrent();
    }

    /**
        Param setters
     */
    function setRewards(address newValue) external override onlyOwner {
        require(newValue.isContract(), "BPoolCompoundERC20Market: not contract");
        rewards = newValue;
        emit ESetParamAddress(msg.sender, "rewards", newValue);
    }

    /**
        @dev See {Rescuable._authorizeRescue}
     */
    function _authorizeRescue(address token, address target)
        internal
        view
        override
    {
        super._authorizeRescue(token, target);
        require(token != address(bToken), "BPoolCompoundERC20Market: no steal");
    }

    uint256[46] private __gap;
}