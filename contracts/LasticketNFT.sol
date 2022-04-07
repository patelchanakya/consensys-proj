// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract LasticketNFT is ERC721, Ownable {

    uint256 public mintPrice;
    uint256 public currentSupplyMinted;
    uint256 public maxMintSupply;
    uint256 public maxPerWallet;
    bool public mintEnabled;
    string internal tokenUri;
    mapping(address => uint256) public walletCurrentSupplyMinted;
    address private withdrawWallet;

    constructor() payable ERC721('LASTICKET', 'NFT3MINT') {
        mintPrice = 0.1 ether;
        maxMintSupply = 20;
        maxPerWallet = 3; // each wallet can mint up to 3 nfts
        withdrawWallet = address(0x96dFCC6413e09c9B02e7892beC6e215D57EF19a7); // limit withdraw to owner address - would build out auto address picker to randomize withdraw wallet
    }

    function setMintEnabled(bool mintEnabled_) external onlyOwner {
        mintEnabled = mintEnabled_;
    }

    function setTokenUri(string calldata tokenUri_) external onlyOwner {
        tokenUri = tokenUri_;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), '...nft token does not exist');
        return string(abi.encodePacked(tokenUri, Strings.toString(tokenId_), ".json"));
    }

    function withdraw() public payable onlyOwner {
        require(address(this).balance > 0, "...no funds to withdraw");
        (bool success, ) = withdrawWallet.call{ value: address(this).balance}('');
        require(success, "...failed to retrieve funds");
    }

    function mint(uint256 reqMintQuantity_) public payable {
        require(mintEnabled, "...minting not enabled");
        require(msg.value == reqMintQuantity_ * mintPrice, "...pay the correct mint price"); // msg.value will be eth amount to be sent by purchaser
        // mints made must be less than max mints allowed, add reqMintQuantity_ to currentSupply to make sure it does not exceed max
        require(currentSupplyMinted + reqMintQuantity_ <= maxMintSupply, "...sold out"); // maximum mintable supply must always be greater than current supply minted
        require(walletCurrentSupplyMinted[msg.sender] + reqMintQuantity_ <= maxPerWallet, "...exceeds wallet limit of 2 nfts");

        // perform mint
        for (uint256 currentMint = 1; currentMint <= reqMintQuantity_; currentMint++) {
            walletCurrentSupplyMinted[msg.sender]++; // increase wallet mints
            currentSupplyMinted++; // increase total mints
            uint256 newTokenId = currentSupplyMinted;
            // new token id for each single mint
            _safeMint(msg.sender, newTokenId);
        }
    }
}