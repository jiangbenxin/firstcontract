import "@nomicfoundation/hardhat-toolbox"
import { ethers } from 'hardhat'
import { expect } from "chai"

describe('Hero', () => {
    async function createHero() {
        const Hero = await ethers.getContractFactory("Hero")
        const hero = await Hero.deploy()
        await hero.waitForDeployment()
        return hero;
    }
    let hero: any;
    before(async function () {
        hero = await createHero()
    });
    it("should fail at creating  hero because if paymeny", async function () {
        let e: any;
        try {
            await hero.createHero(0, {
                value: ethers.parseEther("0.0499")
            })
        } catch (_e) {
            e = _e
        }
        console.log(e);
        
        expect(e.message.includes("Please send more money, at least 0.05 ether")).to.equal(true)
    })
})