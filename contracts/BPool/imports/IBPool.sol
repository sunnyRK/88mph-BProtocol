// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.0;

interface IBPool {
    function mint(uint256 mintAmount) external returns (uint256);
    function redeem(uint256 redeemTokens) external returns (uint256);
    function redeemUnderlying(uint256 redeemAmount) external returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function exchangeRateCurrent() external returns (uint);
}