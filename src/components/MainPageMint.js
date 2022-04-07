import React from "react";
import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import lastTicket from "../LasticketNFT.json";
import { Box, Button, Flex, Input, Text, Spacer } from "@chakra-ui/react";

const lastTicketAddress = "0xB4e49d7baD70c82c0ef9620b36f7d02E68E76f0A";

function validateWalletStyles() {
  document.getElementById("validatewallet").style.color = "red";
  document.getElementById("validatewallet").style.textDecoration = "underline";
  document.getElementById("validatewallet").style.textDecorationStyle =
    "double";
  document.getElementById("validatewallet").style.textDecorationColor =
    "yellow";
}

const MainPageMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const currAddress = accounts[0];
  const [balance, setBalanceTo] = useState();
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const balanceRec = await provider.getBalance(lastTicketAddress);
      console.log("balance BigNumber", balanceRec);
      const mybalance = ethers.utils.formatEther(balanceRec);
      setBalanceTo("mybalance", mybalance);

      const contract = new ethers.Contract(
        lastTicketAddress,
        lastTicket.abi,
        signer
      );

      console.log("wallet address: ", currAddress);
      console.log("contract address: ", contract.address);

      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.1 * mintAmount).toString()),
        });

        console.log("found mint", response);
        if (mybalance === 0) {
          window.alert("nothing");
        }
      } catch (err) {
        console.log("not found: ", err);
        window.alert("encountered an error in minting");
        window.alert(err);
      }
    }
  }

  async function handleWithdraw() {
    const winningAddress = "0x96dfcc6413e09c9b02e7892bec6e215d57ef19a7";

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const balanceRec = await provider.getBalance(lastTicketAddress);
    const mybalance = ethers.utils.formatEther(balanceRec);
    setBalanceTo(mybalance);
    const contract = new ethers.Contract(
      lastTicketAddress,
      lastTicket.abi,
      signer
    );

    console.log("currentAddress yea", currAddress);
    try {
      const newresponse = contract.withdraw();
      console.log("new withdraw request", newresponse);
      if (winningAddress === currAddress) {
        window.alert("THE POT IS YOURS");
      } else {
        window.alert("THE POT IS NOT YOURS");
      }
    } catch (err) {
      console.log("not found: ", err);
      window.alert(err);
    }
  }

  const handleDecrement = () => {
    // when we click minus button on mint
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleImcrement = () => {
    // max mint amount is 4
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  console.log("recieved bal", balance);

  return (
    <Flex
      justify="center"
      align="center"
      height="40vh"
      paddingBottom="15vh"
      paddingTop="25vh"
    >
      <Box width="920px" height="50vh">
        {isConnected ? (
          <div>
            <Flex
              align="center"
              justify="center"
              height="15vh"
              paddingRight="52px"
              paddingBottom="30px"
            >
              <Button
                variant="link"
                backgroundColor="transparent"
                fontSize="100px"
                color="black"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                margin="0 15px"
                border="hidden"
                _hover={{
                  bg: "transparent",
                  outline: "hidden",
                  color: "antiquewhite",
                }}
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input
                readOnly
                fontFamily="inherit"
                backgroundColor="transparent"
                width="100px"
                height="95px"
                fontSize="100px"
                textAlign="center"
                border="none"
                type="number"
                cursor="crosshair"
                value={mintAmount}
              />
              <Button // borderRadius="5px"
                variant="link"
                backgroundColor="transparent"
                // boxShadow="0px 2px 2px 1px #0F0F0F"
                border="hidden"
                _hover={{
                  bg: "transparent",
                  outline: "hidden",
                  color: "antiquewhite",
                }}
                color="black"
                cursor="pointer"
                fontSize="100px"
                fontFamily="inherit"
                padding="15px"
                margin="0 15px"
                onClick={handleImcrement}
              >
                +
              </Button>
            </Flex>
          </div>
        ) : (
          <Spacer>
            <Flex align="center" justify="center" height="100px" color="black">
              <Text fontSize="xl" onClick={validateWalletStyles}>
                <strong>Please find yourself first.</strong>
              </Text>
            </Flex>
          </Spacer>
        )}

        {isConnected && (
          <Flex align="center" justify="center">
            <Button
              colorScheme="red"
              variant="solid"
              backgroundColor="transparent"
              border="none"
              onClick={handleMint}
              cursor="pointer"
            >
              <Text>
                CLAIM TICKET FOR IDENTITY ~ <span> {currAddress}</span> ~
              </Text>
            </Button>
          </Flex>
        )}
        {isConnected && (
          <Flex align="center" justify="center">
            <Button
              variant="solid"
              backgroundColor="transparent"
              border="none"
              onClick={handleWithdraw}
              cursor="pointer"
              color="antiquewhite"
              textDecoration="extrabold"
            >
              <Text id="claimtotalpot">FEELING LUCKY</Text>
            </Button>
          </Flex>
        )}
        <Flex align="center" justify="center" height="100px">
          <Spacer />
          <Text fontSize="30px" fontWeight="black" letterSpacing="-5.5%">
            Claim the last tickets before its too late. Wishing everyone well.
            🙏
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MainPageMint;
