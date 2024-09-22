// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface INFT {
    // Public state variables
    function counter() external view returns (uint256);
    function totalSupply() external view returns (uint256);
    function listPrice() external view returns (uint256);
    function tokenOwner(uint256 tokenId) external view returns (address);
    function countOfTokenId(address owner) external view returns (uint256[] memory);

    // Public/external functions
    function getListPrice() external view returns (uint256);
    function Price() external view returns (uint256);
    function BuurnPrice() external view returns (uint256);
    function NumberOfTokens() external view returns (uint256);
    function mint(string calldata _uri, address _user, uint256 _amount) external payable;
    function burn(address _user) external payable;
}
