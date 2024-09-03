import { ethers } from "ethers";
import { abi } from "../artifacts/contracts/Counter.sol/Counter.json"
function getEth() {
    const eth = (window as any).ethereum;
    if (!eth) {
        throw new Error("No ethereum provider found1")
    }
    return eth
}
async function requestAccess() {
    const eth = getEth()
    const result = await eth.request({ method: "eth_requestAccounts" })
    return result && result.length > 0
}
async function getSigner() {
    const metamask = getEth()
    const signer = await metamask.request({ method: "eth_accounts" })
    return signer.length > 0
}
async function getContract() {
    // 1.地址
    // 2.方法名
    // 3.provider
    if (!await getSigner() && !await requestAccess()) {
        throw new Error("No ethereum provider found2")
    }
    const provider = new ethers.BrowserProvider(getEth())
    // const address:any = process.env.CONTRACT_ADDRESS
    const address: any = "0x36DB4631A534324f69991fc551AA04869C97302a"
    const contract = new ethers.Contract(
        address,
        abi,
        await provider.getSigner()
    )
    const counterdiv = document.createElement("div")
    async function getCount() {
        counterdiv.innerHTML = await contract.getCount()
    }
    getCount()
    contract.on(contract.filters.CounterInc(), async function ({ args }) {
        console.log(args);
        // counterdiv.innerHTML = args[0].toString() || await contract.getCount()
    })
    const btn = document.createElement('button')
    btn.innerText = 'test'
    btn.onclick = async function () {
        // const tx = await contract.count()
        // await tx.wait()
        // getCount()
        await contract.count()
    }
    document.body.appendChild(counterdiv)
    document.body.appendChild(btn)
}
async function main() {
    await getContract()
}
main()