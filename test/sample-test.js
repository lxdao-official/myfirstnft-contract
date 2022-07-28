const { expect } = require("chai");
const { ethers } = require("hardhat");

// todo waiting for someone to improve the test
// 1. signer change
// 2. change status
// 3. change price
// 4. withdraw
// 5. only mint once
// 6. mint with ipfs or image
// 7. read empty token id

describe("Mint", function () {
  const ipfsHash = "ipfs://QmZsvS4tsR1ijY8UsH5xrELiiKy4xXPUcXz8CuuCouJ3ZD";
  let owner;
  let ownerAddr;
  const ownerPrivateKey = "";
  let signature;
  let fakeToken = "";

  (async function () {
    // [owner] = await ethers.getSigners();
    // ownerAddr = await owner.getAddress();

    const hash = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(["string"], [ipfsHash])
    );

    const signerWallet = new ethers.Wallet(ownerPrivateKey);
    const message = ethers.utils.arrayify(hash);
    console.log("message: ", message);
    signature = await signerWallet.signMessage(message);
    console.log("signature: ", signature);
  })();

  // before(async function () {
  //   [owner] = await ethers.getSigners();
  //   ownerAddr = await owner.getAddress();

  //   const hash = ethers.utils.keccak256(
  //     ethers.utils.defaultAbiCoder.encode(["string"], [ipfsHash])
  //   );

  //   const signerWallet = new ethers.Wallet(ownerPrivateKey);
  //   const message = ethers.utils.arrayify(hash);
  //   signature = await signerWallet.signMessage(message);
  // });

  // it("Cannot mint due to status", async function () {
  //   const MFNFT = await ethers.getContractFactory("MFNFT");
  //   const mfnft = await MFNFT.deploy(ownerAddr);
  //   await mfnft.deployed();
  //   try {
  //     await mfnft.mint(ipfsHash, signature);
  //   } catch (error) {
  //     console.log("error: ", error.message);
  //     expect(error.message).to.equal(
  //       "VM Exception while processing transaction: reverted with reason string 'MFNFT: Public sale is not active.'"
  //     );
  //   }
  // });

  // it("Cannot mint due to verify", async function () {
  //   const MFNFT = await ethers.getContractFactory("MFNFT");
  //   const mfnft = await MFNFT.deploy(ownerAddr);
  //   await mfnft.deployed();
  //   await mfnft.setStatus(1);
  //   try {
  //     await mfnft.mint(ipfsHash, fakeToken);
  //   } catch (error) {
  //     console.log("error: ", error.message);
  //     expect(error.message).to.equal(
  //       "VM Exception while processing transaction: reverted with reason string 'MFNFT: Invalid signature.'"
  //     );
  //   }
  // });

  // it("Can mint after passing the verification", async function () {
  //   const MFNFT = await ethers.getContractFactory("MFNFT");
  //   const mfnft = await MFNFT.deploy(ownerAddr);
  //   await mfnft.deployed();
  //   await mfnft.setStatus(1);
  //   await mfnft.mint(ipfsHash, signature);
  //   expect(await mfnft.numberMinted(ownerAddr)).to.equal(1);
  //   expect(await mfnft.tokenURI(0)).to.equal("ipfs://" + ipfsHash);
  // });

  // it("Can only mint one per wallet", async function () {
  //   const MFNFT = await ethers.getContractFactory("MFNFT");
  //   const mfnft = await MFNFT.deploy(ownerAddr);
  //   await mfnft.deployed();
  //   await mfnft.setStatus(1);
  //   await mfnft.mint(ipfsHash, signature);
  //   try {
  //     await mfnft.mint(ipfsHash, signature);
  //   } catch (error) {
  //     console.log("error: ", error.message);
  //     expect(error.message).to.equal(
  //       "VM Exception while processing transaction: reverted with reason string 'MFNFT: The wallet has already minted.'"
  //     );
  //   }
  // });

  // it("Can set price", async function () {
  //   const MFNFT = await ethers.getContractFactory("MFNFT");
  //   const mfnft = await MFNFT.deploy(ownerAddr);
  //   await mfnft.deployed();
  //   await mfnft.setStatus(1);
  //   await mfnft.setPrice(ethers.utils.parseEther("0.02"));
  //   expect(await mfnft.price()).to.equal(ethers.utils.parseEther("0.02"));
  //   await mfnft.mint(ipfsHash, signature, {
  //     value: ethers.utils.parseEther("0.02"),
  //   });
  //   // todo add compare later
  //   // const ownerBalance = await provider.getBalance(ownerAddr);
  // });
});
