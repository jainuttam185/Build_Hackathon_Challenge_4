// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract NFT {
    // Struct to store token data (owner and URI)
    struct TokenData {
        address owner;
        string uri;
    }

    uint256 public counter;
    uint256 public totalSupply;
    uint256 listPrice = 0.001 ether;

    // Mapping of token ID to TokenData
    mapping(uint256 => TokenData) public tokenData;
    // Mapping of address to list of owned token IDs
    mapping(address => uint[]) public countOfTokenId;
    // Mapping from token ID to approved address
    mapping(uint256 => address) public tokenApprovals;

    // Owner of the contract
    address public contractOwner;

    constructor() {
        contractOwner = msg.sender;
    }

    // Modifier to restrict access to the contract owner
    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Ownable: caller is not the owner");
        _;
    }

    // Function to get the listing price
    function getListPrice() public view returns (uint) {
        return listPrice;
    }

    // Function to calculate the current price of a token
    function Price() public view returns (uint256) {
        if (totalSupply == 0) {
            return 100000000000000;
        }
        uint256 price = 1000000000000000000 * (totalSupply)**2 / 8000;
        return price;
    }

    // Function to calculate the burn price
    function BuurnPrice() public view returns (uint) {
        if (totalSupply == 0) {
            return 0;
        }
        uint burnsupply = totalSupply - 1;
        if (burnsupply == 0) {
            return 100000000000000;
        }
        uint pricee = 1000000000000000000 * (burnsupply)**2 / 8000;
        return pricee;
    }

    // Function to return the number of tokens owned by the caller
    function NumberOfTokens() public view returns (uint) {
        return countOfTokenId[msg.sender].length;
    }

    // Internal function to mint a token
    function _mint(address to, uint256 tokenId, string memory uri) internal {
        require(to != address(0), "ERC721: mint to the zero address");
        require(tokenData[tokenId].owner == address(0), "ERC721: token already minted");

        // Update token ownership and URI
        tokenData[tokenId] = TokenData(to, uri);

        // Add the token to the owner's list
        countOfTokenId[to].push(tokenId);

        emit Transfer(address(0), to, tokenId);
    }

    // Internal function to burn a token
    function _burn(uint256 tokenId) internal {
        address owner = tokenData[tokenId].owner;
        require(owner != address(0), "ERC721: token does not exist");

        // Clear approval
        _approve(address(0), tokenId);

        // Remove the token from the owner's list
        uint[] storage ownedTokens = countOfTokenId[owner];
        for (uint i = 0; i < ownedTokens.length; i++) {
            if (ownedTokens[i] == tokenId) {
                ownedTokens[i] = ownedTokens[ownedTokens.length - 1];
                ownedTokens.pop();
                break;
            }
        }

        // Remove token data
        delete tokenData[tokenId];

        emit Transfer(owner, address(0), tokenId);
    }

    // Function to mint a new token
    function mint(string calldata _uri, address _user, uint256 _amount) external payable {
        uint256 mintPrice = Price();
        require(_amount >= mintPrice, "please enter correct amount");

        counter++;
        totalSupply++;
        _mint(_user, counter, _uri);
    }

    // Function to burn the last minted token by the caller
    function burn(address _user) external payable {
        require(countOfTokenId[_user].length > 0, "Sorry don't have enough tokens, Please mint");

        uint length = countOfTokenId[_user].length;
        uint _tokenId = countOfTokenId[_user][length - 1];

        totalSupply--;
        _burn(_tokenId);

        payable(_user).transfer(BuurnPrice());
    }

    // Internal function to approve a token transfer
    function _approve(address to, uint256 tokenId) internal {
        tokenApprovals[tokenId] = to;
        emit Approval(tokenData[tokenId].owner, to, tokenId);
    }

    // Function to get the owner of a token
    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = tokenData[tokenId].owner;
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    // Transfer function
    function transferFrom(address from, address to, uint256 tokenId) public {
        require(from == tokenData[tokenId].owner, "ERC721: transfer of token that is not own");
        require(to != address(0), "ERC721: transfer to the zero address");

        _approve(address(0), tokenId); // Clear approval

        tokenData[tokenId].owner = to;

        // Remove from the previous owner
        uint[] storage fromTokens = countOfTokenId[from];
        for (uint i = 0; i < fromTokens.length; i++) {
            if (fromTokens[i] == tokenId) {
                fromTokens[i] = fromTokens[fromTokens.length - 1];
                fromTokens.pop();
                break;
            }
        }

        // Add to the new owner
        countOfTokenId[to].push(tokenId);

        emit Transfer(from, to, tokenId);
    }

    // Events from ERC721 standard
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
}
