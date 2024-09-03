import "@nomicfoundation/hardhat-ethers"
import { ethers } from "hardhat"

async function deploy(name: string, ...args: (string | undefined)[]) {
    const Fallback = await ethers.getContractFactory(name)
    const fallback = await Fallback.deploy(...args)
    await fallback.waitForDeployment()
    console.log("fallback address is", await fallback.getAddress());
    return fallback;
}

async function fallback() {
    // const ERC721: any = await deploy("ERC721");
    const Ownable: any = await deploy("Ownable");
    const SafeMath: any = await deploy("SafeMath");
    const ZombieFactory: any = await deploy("ZombieFactory");
    const ZombieFeeding: any = await deploy("ZombieFeeding");
    const ZombieHelper: any = await deploy("ZombieHelper");
    const ZombieAttack: any = await deploy("ZombieAttack");
    const ZombieOwnership: any = await deploy("ZombieOwnership");
    // const ZombieFactory: any = await deploy("ZombieFactory",SafeMath.address, Ownable.Ownable);
    // const ZombieFeeding: any = await deploy("ZombieFeeding",ZombieFactory.address);
    // const ZombieHelper: any = await deploy("ZombieHelper",ZombieFeeding.address, SafeMath.address);
    // const ZombieAttack: any = await deploy("ZombieAttack",SafeMath.address, ZombieHelper.address);
    // const ZombieOwnership: any = await deploy("ZombieOwnership",SafeMath.address, ZombieAttack.address, );
    return ZombieFactory
}
async function count(fallback:any) {
    const ZombieFactory: any = await ethers.getContractAt("ZombieFactory", await fallback.getAddress())
    await ZombieFactory.createRandomZombie("box");
    console.log(await ZombieFactory.getZombies());
    // console.log("count is",await fallback.getCount());
}
fallback().then(count)