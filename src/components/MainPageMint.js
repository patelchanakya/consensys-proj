import React from "react";
import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import LasticketNFT from "../LasticketNFT.json";
import { Box, Button, Flex, Input, Text, Spacer } from "@chakra-ui/react";

const lastTicketAddress = "0x5BcAe88BE5540cB4CC80074EbbF0B75b207a0467";

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
  const [balance, setBalanceTo] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [isMinting, setIsMinting] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [remainBal, setRemainBal] = useState();

  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      setIsMinting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const mysigner = provider.getSigner();

      console.log("wallet address: ", currAddress);
      console.log("mint quantity: ", mintAmount, "tickets to mint");

      const balanceRec = await provider.getBalance(lastTicketAddress);
      console.log("----------------------");
      const mybalance = ethers.utils.formatEther(balanceRec);
      console.log("contract balance ->", mybalance, "ETH in the pot");
      const shownBal = +mybalance;
      setBalanceTo(shownBal.toFixed(2));
      const contract = new ethers.Contract(
        lastTicketAddress,
        LasticketNFT.abi,
        mysigner
      );

      //pull wallet amnt
      const newball = await contract.balanceOf(currAddress);
      const newwallbal = newball.toNumber();
      const incomingbala = newwallbal;
      setWalletBalance(incomingbala);

      // upon minting show current number of tickets bought
      console.log(
        "wallet balance ->",
        newball.toNumber(),
        "tickets already owned"
      );

      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.01 * mintAmount).toString()),
        });
        // upon minting show current number of tickets bought
        const newball = await contract.balanceOf(currAddress);
        const newwallbal = newball.toNumber();
        const incomingbala = newwallbal + mintAmount;
        setWalletBalance(incomingbala);

        setIsMinting(false);

        // upon minting show a pot balance
        const balanceRec = await provider.getBalance(lastTicketAddress);
        console.log("-----------------------");
        console.log(balanceRec);
        const mybalance = ethers.utils.formatEther(balanceRec);
        console.log("my balance", mybalance);
        const incomingBal = 0.01 * mintAmount;
        const shownBal = +incomingBal + +mybalance;
        setBalanceTo(shownBal.toFixed(2));

        console.log("-------- found ------- mint ------->", response);
      } catch (err) {
        window.alert("There was a problem minting.");
        window.alert(err.message);
        setIsMinting(false);
      }
    }
  }

  async function handleWithdraw() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      lastTicketAddress,
      LasticketNFT.abi,
      signer
    );
    setIsWithdrawing(true);

    const balanceRec = await provider.getBalance(lastTicketAddress);
    const mybalance = ethers.utils.formatEther(balanceRec);
    setBalanceTo(mybalance);

    const mytargets = ["0.01", "0.04", "0.07"];

    if (mytargets.indexOf(mybalance) > -1) {
      setRemainBal(0);
      try {
        console.log("mint quantity -> looking to mint", mintAmount, "tickets");
        const response = await contract.withdraw();
        setIsWithdrawing(false);

        console.log("-------- found ------- mint ------->", response);
      } catch (err) {
        window.alert("Ran into an error withdrawing");
        window.alert(err.message);
        setIsWithdrawing(false);
      }
    } else {
      const number = Number(mybalance);

      // not a match

      setIsWithdrawing(false);

      const candidates = [0.01, 0.04, 0.07];

      //looking for the lowest valid target, so start at infinity and work down
      let bestCandidate = Infinity;

      //only consider numbers higher than the target
      const higherCandidates = candidates.filter(
        (candidate) => candidate > number
      );

      //loop through those numbers and check whether any of them are better than
      //our best target so far
      higherCandidates.forEach((candidate) => {
        if (candidate < bestCandidate) bestCandidate = candidate;
      });

      setRemainBal(bestCandidate - Number(mybalance));

      window.alert("please fill pot, target not met");
      return;
    }
  }

  const handleDecrement = () => {
    // when we click minus button on mint
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleImcrement = () => {
    // max mint amount is 2
    if (mintAmount >= 2) return;
    setMintAmount(mintAmount + 1);
  };

  const hintSwitch = () => {
    console.log("----->", remainBal);
    if (remainBal <= 0.01 && remainBal > 0) {
      return "🟥";
    } else if (remainBal > 0.01) {
      return "🟦";
    } else if (remainBal === 0) {
      return "🟩";
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      height="40vh"
      paddingBottom="20vh"
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
              <Button
                variant="link"
                backgroundColor="transparent"
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
        {isWithdrawing ? hintSwitch() : " "}
        {isConnected && (
          <Flex align="center" justify="center">
            {isMinting ? (
              <Button colorScheme="red" variant="solid" disabled={true}>
                <Text>MINTING IN PROGRESS</Text>
              </Button>
            ) : walletBalance < 2 ? (
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
            ) : (
              <Button colorScheme="red" variant="solid" disabled={true}>
                <Text>COME BACK IN ONE HOUR</Text>
              </Button>
            )}
          </Flex>
        )}
        {isConnected && (
          <Flex align="center" justify="center">
            {isWithdrawing ? (
              <Button colorScheme="red" variant="solid" disabled={true}>
                <Text>WITHDRAW IN PROGRESS</Text>
              </Button>
            ) : (
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
            )}
          </Flex>
        )}

        {/* stats */}
        {isConnected && (
          <Flex align="center" justify="center">
            <Text color="black">
              ETH FOR CLAIM 💸💸
              <strong> {balance} ETH</strong>
            </Text>

            <Spacer />
            <Text color="black">
              TICKETS PURCHASED 🎟️🎟️ <strong>{walletBalance}/2 TICKETS</strong>
            </Text>
          </Flex>
        )}

        <Flex align="center" justify="center" height="80px">
          <Spacer />
          <Text fontSize="28.2px" fontWeight="black">
            🙈🙉 Claim the last tickets before its too late. Wishing everyone
            well...
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MainPageMint;
