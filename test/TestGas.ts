import "@nomicfoundation/hardhat-ethers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("TestGas",()=>{
    it("TestGas",async function () {
        const TG = await ethers.getContractFactory("TestGas")
        const tg:any = await TG.deploy()
        await tg.waitForDeployment()
        for (let i = 0; i < 10; i++) {
            await tg.test1();         
            await tg.test2();         
            await tg.test3();         
            await tg.test4();         
            await tg.test5();         
        }
    })
})