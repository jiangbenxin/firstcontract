import "@nomicfoundation/hardhat-toolbox"
import { ethers } from 'hardhat'
import { expect } from "chai"

describe('Hero', () => {
    async function createHero() {
        // const Hero = await ethers.getContractFactory("Hero")
        const Hero = await ethers.getContractFactory("TestHero")
        const hero = await Hero.deploy()
        await hero.waitForDeployment()
        return hero;
    }
    let hero: any;
    before(async function () {
        hero = await createHero()
    });

    it("should get zero hero array", async function () {
        expect(await hero.getHeroes()).to.deep.equal([])

    })

    it("should fail at creating  hero because if paymeny", async function () {
        let e: any;
        try {
            await hero.createHero(0, {
                value: ethers.parseEther("0.0499")
            })
        } catch (_e) {
            e = _e
        }
        expect(e.message.includes("Please send more money, at least 0.05 ether")).to.equal(true)
    })

    it("should generate right stats value", async function () {
        const hero: any = await createHero();
        await hero.setRandom(69);
        await hero.createHero(0, {
            value: ethers.parseEther("0.05")
        })
        const h = (await hero.getHeroes())[0];
        expect(await hero.getDex(h)).to.equal(16)
        expect(await hero.getHealth(h)).to.equal(2)
        expect(await hero.getStrength(h)).to.equal(6)
    })
})