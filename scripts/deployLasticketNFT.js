const hre = require("hardhat");

async function main() {
  const LasticketNFT = await hre.ethers.getContractFactory("LasticketNFT");
  const lasticketNFT = await LasticketNFT.deploy();

  await lasticketNFT.deployed();

  console.log("LasticketNFT contract deployed to: ", lasticketNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
