import contractAddress from '../crypto/contractAddress';
import Web3 from 'web3';
import abi from '../crypto/uniswapV2PairABI.js';

const rpcEndpoint = 'https://rpc.ftm.tools/'

const getPrice = async (address,dec1,dec2) => {
    let provider = new Web3.providers.HttpProvider(rpcEndpoint)
    let w3 = new Web3(provider)

    try{
        let pair = new w3.eth.Contract(abi,address);
        let {reserve0,reserve1} = await pair.methods['getReserves']().call()
        let res0 = reserve0*(10**dec1)
        return (res0/reserve1)/(10**dec2)
    }
    catch(e){
        console.log(e)
    }
    return 0
}

/*
const getPriceInv = async (address,dec1,dec2) => {
    console.log('address: ' + address)
    try{
        let pair = new window.web3.eth.Contract(abi,address);
        let {reserve0,reserve1} = await pair.methods['getReserves']().call()
        let res0 = reserve1*(10**dec1)
        return (res0/reserve0)/(10**dec2)
    }
    catch(e){
        console.log(e)
    }
    return 0
}
*/

const get = async () => {
    let elysFtm = await getPrice(contractAddress['elysFtmPair'],5,18)
    let ftmUSD = await getPrice(contractAddress['ftmUsdPair'],18,6)
    let elysUSD = elysFtm * ftmUSD

    console.log('*******************************')
    console.log('inFTM: ' + elysFtm)
    console.log('ftmusd: ' + ftmUSD)
    console.log('elysUSD: ' + elysUSD)
    console.log('*******************************')

    return {ftm:elysFtm,usd:elysUSD}
}

let exp = {get}

export default exp