pragma solidity 0.8.0;


// Compound finance Comptroller interface
// Documentation: https://compound.finance/docs/comptroller
interface IComptroller {
    function claimComp(address holder) external;
    function getCompAddress() external view returns (address);
}

interface IBComptroller {
    function claimComp(address holder) external;
    function comptroller() external view returns (address);
}