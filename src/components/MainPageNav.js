import React from "react";
import { Box, Button, Flex, Image, Link, Spacer, Text } from "@chakra-ui/react";
import Discord from "../media/icons8-discord.gif";
import Twitter from "../media/icons8-twitter.gif";

function findMintsStyleHandler() {
  document.getElementById("claimtotalpot").style.color = "red";
  document.getElementById("claimtotalpot").style.textDecoration = "underline";
  document.getElementById("claimtotalpot").style.textDecorationStyle = "double";
  document.getElementById("claimtotalpot").style.textDecorationColor = "yellow";
}

function togglePopup() {
  window.alert("______team mia______");
}
const MainPageNav = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
      console.log("accounts set", accounts[0]); //address of wallet connected
    }
    // get tokenOfOwnerByIndex (like in web3) to retrieve individual nft token metadata
  }

  return (
    <Flex justify="space-between" align="center" padding="30px">
      <Flex justify="space-between" align="center" padding="0px 75px">
        <Link href="https://www.twitter.com/chanakyeah">
          <Image src={Twitter} boxSize="42px" margin="0 15px" />
        </Link>
        <Link href="https://www.discord.com/">
          <Image src={Discord} boxSize="42px" margin="0 15px" />
        </Link>
      </Flex>

      <Flex justify="space-around" align="center" width="40%" padding="30px">
        <Box margin="0 15px">
          <Text fontSize="xl" onClick={togglePopup} id="aboutme">
            {/* hold about and highlight some text on screen that is initially not visibile */}
            <strong>About</strong>
          </Text>
        </Box>
        <Spacer />
        <Box margin="0 15px">
          {/* pop up hover where you can put wallet address and */}
          <Text fontSize="xl" onClick={findMintsStyleHandler}>
            <strong>Claim the Pot</strong>
          </Text>
        </Box>
        <Spacer />
        <Box margin="0 15px">
          <Text>
            <Link
              isExternal={true}
              color="black"
              textDecoration="none"
              href="https://www.chanak.xyz"
            >
              <strong>Team</strong>
            </Link>
          </Text>
        </Box>
        <Spacer />

        {isConnected ? (
          <Box margin="0 15px">
            <Text color="antiquewhite" fontSize="md">
              identity verified
            </Text>
          </Box>
        ) : (
          <Button
            variant="link"
            backgroundColor="transparent"
            border="none"
            color="antiquewhite"
            cursor="pointer"
            fontFamily="inherit"
            padding="2px"
            margin="0 15px"
            fontSize="lg"
            onClick={connectAccount}
            id="validatewallet"
          >
            validate identity
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default MainPageNav;
