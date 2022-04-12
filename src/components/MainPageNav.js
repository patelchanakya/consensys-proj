import React from "react";
import { Box, Button, Flex, Image, Link, Spacer, Text } from "@chakra-ui/react";
import Discord from "../media/icons8-discord.gif";
import Twitter from "../media/icons8-twitter.gif";

const lastTicketAddress = "0x5BcAe88BE5540cB4CC80074EbbF0B75b207a0467";

function findMintsStyleHandler() {
  document.getElementById("claimtotalpot").style.color = "red";
  document.getElementById("claimtotalpot").style.textDecoration = "underline";
  document.getElementById("claimtotalpot").style.textDecorationStyle = "double";
  document.getElementById("claimtotalpot").style.textDecorationColor = "yellow";
}

function togglePopup() {
  window.alert(
    "Connect and purchase up to 2 tickets an hour. Ticket proceeds contribute to the pot amount (ETH) that is available for claim. If the pot reaches the unknown targets and you are FEELING LUCKY, you can steal the pot. The pot must be withdrawn in time, because if another ticket is purchased and the total pot increases, a new target must be reached in order to be able to withdraw pot again. Look out for hints to see how close you are to the target, keep going if your HOT! We hope you make it..."
  );
}
const MainPageNav = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
      console.log("accounts set to ->", accounts[0]); //address of wallet connected
    }
  }
  return (
    <Flex justify="space-between" align="center" padding="30px">
      <Flex justify="space-between" align="center" padding="0px 75px">
        <Link href="https://www.twitter.com/chanakyeah" target="_blank">
          <Image src={Twitter} boxSize="42px" margin="0 15px" />
        </Link>
        <Link href="https://www.discord.com/" target="_blank">
          <Image src={Discord} boxSize="42px" margin="0 15px" />
        </Link>
      </Flex>

      <Flex justify="space-between" align="center" padding="0px 75px">
        <Link
          href="https://www.etherscan.io"
          target="_blank"
          textDecoration="none"
        >
          <Text
            fontSize="xs"
            onClick={findMintsStyleHandler}
            color="antiquewhite"
          >
            <strong>{lastTicketAddress}</strong>
          </Text>
        </Link>
      </Flex>

      <Flex justify="space-around" align="center" width="40%" padding="30px">
        <Box margin="0 15px">
          <Text fontSize="xl" onClick={togglePopup} id="aboutme" padding="1px">
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
