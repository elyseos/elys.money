import React, { Component } from 'react'
import Contract from '../lib/contract'
import contractAddress from '../crypto/contractAddress';
import TokenInfoBox from './tokeninfobox'

//const orange = '#ec7019'

let trimDec = (n,dec) => {
    let ar = n.toString().split('.')
    if(ar.length===1) return ar[0]
    if(dec===0) return ar[0]
    ar[1] = ar[1].substr(0,dec)
    return ar.join('.')
}

let addCommas = (amnt) => {
    let ar = amnt.toString().split('').reverse()
    let cnt = 0
    let rslt = ''
    for(var i in ar){
        if(cnt===3){
            cnt=0
            rslt = ',' + rslt
        }
        rslt = ar[i] + rslt
        cnt++
    }
    return rslt
}

class Stats extends Component {
    state = {
        totalSupply: 0
    }
    loading = () => this.state.totalSupply===0 || this.props.price.loading
    wait = (tm) => {
        return new Promise(r=>{
            setTimeout(()=>r(),tm)
        })
    }
    getTotalElys = async () => {
        let Token = new Contract('elys',contractAddress['elys'])
        try{
            let totalSupply = await Token['totalSupply']()
            return totalSupply
        }
        catch(e){
            this.wait(200)
            return await this.getTotalElys()
        }        
    }
    getLocked = async () => {
        let startDate = new Date('22 Aug 2021')
        let now = Date.now()
        let daysPassed = parseInt((now - startDate.getTime())/(24*3600*1000))

        let getLocked = (orig,days) => orig-(orig/days)*daysPassed

        let seedLocked = getLocked(1736266,20)  //20 days
        let teamLocked = getLocked(700000,100)  //100 days
        let foundationLocked = getLocked(10000000,100)  //100 days

        let land = (daysPassed<365)?10000000:0 //365 days

        return parseInt(seedLocked + teamLocked + foundationLocked + land)
    }
    componentDidMount = async () => {
        let totalSupply = await this.getTotalElys()
        let locked = await this.getLocked()

        this.setState({totalSupply,locked})
    }
    marketCap = () => {
        return addCommas(trimDec((this.state.totalSupply/100000)*this.props.price.usd,0))
    }
    valueLocked = () => {
        return addCommas(trimDec(this.state.locked * this.props.price.usd,0))
    }
    inCirculation = () => {
        return addCommas(this.state.totalSupply/100000 - this.state.locked)
    }
    render = () => {
       if(this.loading())return null
        return (
            <div style={{maxWidth: 800, marginTop: 30, marginBottom: 30}}>
                <TokenInfoBox text={'$ ' +  this.valueLocked()} label={'Total Value Locked'} />    
                <TokenInfoBox text={'$ ' + this.marketCap()} label={'Market Cap'} />
                <TokenInfoBox text={this.inCirculation()} label={'Circulating ELYS'} />
            </div>
        )
    }

}

export default Stats