import chai from "chai";
import hardhat from "hardhat";
const { ethers } = hardhat;
const { expect } = chai;

describe("Counter", function () {
  async function deployCounterFixture() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.waitForDeployment();
    return { counter };
  }

  it("初始 x 应为 0", async function () {
    const { counter } = await deployCounterFixture();
    expect(await counter.x()).to.equal(0n);
  });

  it("inc 应将 x 加 1 并触发事件", async function () {
    const { counter } = await deployCounterFixture();
    await expect(counter.inc()).to.emit(counter, "Increment").withArgs(1n);
    expect(await counter.x()).to.equal(1n);
  });

  it("incBy 应按给定值增加并触发事件", async function () {
    const { counter } = await deployCounterFixture();
    await expect(counter.incBy(5)).to.emit(counter, "Increment").withArgs(5n);
    expect(await counter.x()).to.equal(5n);
  });

  it("incBy(0) 应回退", async function () {
    const { counter } = await deployCounterFixture();
    await expect(counter.incBy(0)).to.be.revertedWith("incBy: increment should be positive");
  });
});


