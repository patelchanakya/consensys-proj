// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract LasticketNFT is ERC721, Ownable {

    uint256 public constant mintPrice = 10000000000000000 wei;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled = true;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721('LasticketNFT', 'ConsensysDevRel') {
        maxSupply = 9;
        maxPerWallet = 2;
    }

    // argumenet named with _
    // onlyOwner from Ownable.sol
    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exist');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
    }

    function withdraw() external {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, '...withdraw has failed');
    }

    // mint function
    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, "...minting not enabled");
        require(msg.value == quantity_ * mintPrice, "...pay the correct mint price");
        require(totalSupply + quantity_ <= maxSupply,  "...sold out");
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, "...exceeds wallet limit of 2 nfts, try a lower quanity");

        // perform mint
        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            // check-affects interaction
            totalSupply++;
            walletMints[msg.sender]++;
             // affect - change of any variable in storage - must occur before interaction to prevent re-entrancy attack
            _safeMint(msg.sender, newTokenId); // interaction
        }
    }
}