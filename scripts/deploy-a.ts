import "@nomicfoundation/hardhat-ethers"
import { ethers } from "hardhat"

async function deploy(name: string, ...args: (string | undefined)[]) {
    const Fallback = await ethers.getContractFactory(name)
    const fallback = await Fallback.deploy(...args)
    await fallback.waitForDeployment()
    console.log("fallback address is", await fallback.getAddress());
    return fallback;
}

async function printStorage(contract: any, name: any, count: any) {
    for (let i = 0; i < count; i++) {
        console.log(name, i, await ethers.provider.getStorage(await contract.getAddress(), i))
    }
}

async function fallback() {
    const a: any = await deploy("A")
    const b: any = await deploy("B", await a.getAddress())
    // console.log("A", await a.getA());
    // console.log("b", await b.getB());
    // console.log("-------------");
    // await a.setA(42)
    // console.log("A", await a.getA());
    // console.log("b", await b.getB());
    // console.log("-------------");
    // await b.setB(60)
    // console.log("A", await a.getA());
    // console.log("b", await b.getB());
    await  printStorage(b, "B", 5)
    await b.setB(0x45)

    console.log("-------------");
    await  printStorage(b, "B", 5)
}
fallback()