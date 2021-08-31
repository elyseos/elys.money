import React, { Component } from 'react'
import TokenInfoBox from '../components/tokeninfobox'
import Contract from '../lib/contract'
import Withdraw from '../components/withdraw'
import contractAddress from '../crypto/contractAddress';


class TokenInfo extends Component {
    state = {
        lockedLoading: true,
        withdrawnLoading: true,
        availableLoading: true,
        waitingForWithdraw: false,
        error: false
    }
    withdraw = async () => {
        let lock = this.props.lock
        this.setState({waitingForWithdraw:true})
        //need to do polling etc. here
        let checkDone = setInterval(async ()=>{
            try{
                let available = await lock['amountCanRelease']([])
                if(available===0){
                    clearInterval(checkDone)
                    await this.props.getInfo(this.props.type)
                    this.setState({waitingForWithdraw:false})
                }
            }
            catch(e){
                console.log(e)
            }
        },20000)
        try{
            await lock['release']([])
            clearInterval(checkDone)
            await this.props.getInfo(this.props.type)
            this.setState({waitingForWithdraw:false})
        }
        catch(e){
            clearInterval(checkDone)
            //this.setState({error: true})
            //await this.wait(1000)
            await this.props.getInfo(this.props.type)
            this.setState({waitingForWithdraw:false, error: false})
        }
        
    }
    wait = (tm) => {
        return new Promise(r=>{
            setTimeout(()=>r(),tm)
        })
    }
   
    render = () => {
        let withdraw = (!this.props.loading)?<Withdraw amount={parseFloat(this.props.available)} withdraw={this.withdraw} waiting={this.state.waitingForWithdraw} error={this.state.error}/>:null
        
        return (
            <div style={{
                maxWidth: 900,
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 40,
                textAlign: 'center'
            }}>
                <TokenInfoBox text={this.props.locked + " ELYS"} label="Locked" loading={this.props.loading}/>
                <TokenInfoBox text={this.props.withdrawn + " ELYS"} label="Already Withdrawn" loading={this.props.loading}/>
                <TokenInfoBox text={this.props.available + " ELYS"} label="Available to Withdraw" loading={this.props.loading}/>
                {withdraw}
            </div>
        )
    }
}

class UnlockPage extends Component {
    state = {
        seedInfo: {loading: true},
        teamInfo: {loading: true},
        lockSeed: null,
        lockTeam: null,
        viewing: 'seed',
        loading: true,
        account: ''
    }
    wait = (tm) => {
        return new Promise(r=>{
            setTimeout(()=>r(),tm)
        })
    }
    getLock = async (factory) => {
        console.log(factory)
        let TokenFactory = new Contract('lockFactory',contractAddress[factory])
        let accounts = await window.web3.eth.getAccounts()
        let account = accounts[0]
        this.setState({account: account})
        try{
            let lockAddress = await TokenFactory['getLock']([account])
            console.log(lockAddress)
            return new Contract('lockToken',lockAddress)
        }
        catch(e){
            console.log(e.message)
            /*
            if(e.code===-32603){
                return null
            }
            await this.wait(1000)
            return await this.getLock(factory)
            */
           return null
           
        }
        
    }
    getInfo = async (lockType) => {
        let lock = (lockType==='seed')?this.state.lockSeed:this.state.lockTeam
        
        try{
            await this.wait(200)
            let locked = await lock['locked']([])
            locked = parseInt(locked/100000).toString()
            await this.wait(200)
            let withdrawn = await lock['released']([])
            withdrawn = parseInt(withdrawn/100000).toString()
            await this.wait(200)
            let available = await lock['amountCanRelease']([])
            available = parseInt(available/100000).toString()
            let info = {
                loading: false,
                locked,withdrawn,available,type:'lockType'
            }
            console.log(info)
            if(lockType==='seed'){
                this.setState({seedInfo:info})
            } else {
                this.setState({teamInfo:info})
            }
        }
        catch(e){
            setTimeout(()=>this.getInfo(lockType),500)
        }
    }
    componentDidMount = async () => {
        let seedLock = await this.getLock('lockFactorySeed')
        await this.wait(200)
        let teamLock = await this.getLock('lockFactoryTeam')
        
        
        this.setState({
            lockSeed: seedLock,
            lockTeam: teamLock,
            loading: false
        })

        if(seedLock) await this.getInfo('seed')
        if(teamLock) await this.getInfo('team')
        
    }
    choose = (lock) => {
        console.log(lock)
        this.setState({viewing:lock})
    }
    render = () => {
        let style={
            display: 'block',
            marginTop: 100,
            textAlign: 'center',
            fontSize: 20,
            width: '100%'
        }
        if(this.state.loading)return (
            <div style={style}>Loading..</div>
        )
        if(!this.state.lockSeed && !this.state.lockTeam)return (
            <div style={style}>
                You don't currently have any tokens locked up for this account
                <div style={{fontSize: 12, color: '#dddddd', marginTop: 10}}>[{this.state.account}]</div>
            </div>
        )
        if(this.state.lockSeed && this.state.lockTeam){
            let tokenInfo = (this.state.viewing==='seed')?(<TokenInfo {...this.state.seedInfo} lock={this.state.lockSeed} getInfo={this.getInfo}/>):(<TokenInfo  {...this.state.teamInfo} lock={this.state.lockTeam} getInfo={this.getInfo}/>)
            return (
            <div style={{
                maxWidth: 900,
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 40,
                textAlign: 'center'
            }}>
                
                <div style={{width: 300, marginLeft: 'auto', marginRight: 'auto', marginTop: 30}}>
                    <button onClick={()=>this.choose('seed')} style={{
                        display: 'inline-block',
                        border: 'none',
                        backgroundColor: 'transparent',
                        fontWeight: (this.state.viewing==='seed')?'bold':'normal',
                        borderBottom: (this.state.viewing==='seed')?'solid 1px #ffffff':'none',
                        cursor: (this.state.viewing==='seed')?'none':'pointer',
                        fontSize: 18,
                        marginRight: 20,
                        color: (this.state.viewing==='seed')?'#ffffff':'#eeeeee'
                    }}>Seed Tokens</button>
                    <button onClick={()=>this.choose('team')} style={{
                        display: 'inline-block',
                        border: 'none',
                        backgroundColor: 'transparent',
                        fontWeight: (this.state.viewing==='team')?'bold':'normal',
                        borderBottom: (this.state.viewing==='team')?'solid 1px #ffffff':'none',
                        cursor: (this.state.viewing==='team')?'none':'pointer',
                        fontSize: 18,
                        marginLeft: 20,
                        color: (this.state.viewing==='team')?'#ffffff':'#eeeeee'
                    }}>Team Tokens</button>
                </div>
                {tokenInfo}
            </div>
            )
        } 
        if(this.state.lockSeed) return (<TokenInfo lock={this.state.lockSeed} {...this.state.seedInfo} getInfo={this.getInfo}/>)
        return (<TokenInfo lock={this.state.lockTeam} {...this.state.teamInfo} getInfo={this.getInfo}/>)
    }
}

export default UnlockPage