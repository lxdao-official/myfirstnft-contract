const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("contract test", function () {
  let owner;
  let Token;
  let hardhatToken;
  let originalSigner;
  let changedSigner;
  const imageIPFSURI = "ipfs://QmZsvS4tsR1ijY8UsH5xrELiiKy4xXPUcXz8CuuCouJ3ZD";

  beforeEach(async function () {
    Token = await ethers.getContractFactory("MFNFT");
    [owner, originalSigner, changedSigner] = await ethers.getSigners();
    hardhatToken = await Token.deploy(originalSigner.address);
  });

  it("Should set the right owner", async function () {
    expect(await hardhatToken.owner()).to.equal(owner.address);
  });

  it("mint test #1 - Change signer ", async function () {
    await hardhatToken.setSigner(changedSigner.address);
    expect(await hardhatToken.verifySigner(changedSigner.address));
  });

  it("mint test #2 - Change status ", async function () {
    await hardhatToken.setStatus(1);
    expect(await hardhatToken.status()).to.equal(1);
  });

  it("mint test #3 - Change price ", async function () {
    const wei = ethers.utils.parseEther("0.01");
    await hardhatToken.setPrice(wei);
    expect(await hardhatToken.price()).to.equal(wei);
  });

  it("mint test #4 - cannot mint due to status ", async function () {
    const hash = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(["string"], [imageIPFSURI])
    );
    const message = ethers.utils.arrayify(hash);
    const signature = await originalSigner.signMessage(message);

    await expect(hardhatToken.mint(imageIPFSURI, signature)).to.be.revertedWith(
      "VM Exception while processing transaction: reverted with reason string 'MFNFT: Public mint is not active.'"
    );
  });

  it("mint test #5 - cannot mint due to verify", async function () {
    await hardhatToken.setStatus(1);

    const hash = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(["string"], [imageIPFSURI])
    );
    const message = ethers.utils.arrayify(hash);
    // uncorrected signer
    const signature = await changedSigner.signMessage(message);

    await expect(hardhatToken.mint(imageIPFSURI, signature)).to.be.revertedWith(
      "VM Exception while processing transaction: reverted with reason string 'MFNFT: Invalid signature.'"
    );
  });

  it("mint test #6 - only mint once", async function () {
    await hardhatToken.setStatus(1);

    const hash = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(["string"], [imageIPFSURI])
    );
    const message = ethers.utils.arrayify(hash);
    const signature = await originalSigner.signMessage(message);

    await hardhatToken.mint(imageIPFSURI, signature);

    // mint again
    await expect(hardhatToken.mint(imageIPFSURI, signature)).to.be.revertedWith(
      "VM Exception while processing transaction: reverted with reason string 'MFNFT: The wallet has already minted.'"
    );
  });

  it("mint test #7 - read empty token id", async function () {
    expect(await hardhatToken.tokenURI(0)).to.equal("");
  });
});
