import React, { Component } from 'react'
import Web3 from "web3"
import detectEthereumProvider from '@metamask/detect-provider'
import Loading from './loading'
import Connect from './connect'
import {isMobile} from 'react-device-detect';

class PageWrapper extends Component {
    state = {
        loading: true,
        hasMetamask: false,
        isConnected: false,
    }
    checkMetamask = async () => {
        let provider = await detectEthereumProvider({mustBeMetaMask:true})
        if (provider) {
            window.ethereum = provider
            return true //window.ethereum.isMetaMask 
        }
        return false
    }
    connect = async () => {
        //window.ethereum.enable();
        try{
            let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            let connected = accounts.length>0 && window.ethereum.isConnected
            if(connected){
                this.setState({isConnected: true})
                this.props.connected()
            }
        }
        catch(e){
            console.log(e)
        }
    }
    componentDidMount = async () => {
        let hasMetamask = await this.checkMetamask()
        if(hasMetamask){
            window.web3 = new Web3(window.ethereum);
            if(!window.ethereum.isConnected){
                this.setState({loading: false,hasMetamask: true, isConnected: false})
                return
            }
            let accounts = await window.web3.eth.getAccounts();
            let connected = accounts.length>0
            this.setState({loading: false,hasMetamask: true, isConnected: connected})
            //this.setState({loading: false,hasMetamask: false, isConnected: false})
            this.props.connected()
        }
        else{
            this.setState({loading: false})
        }
        
    }
    render = () => {

        /*
            Sy, [30 Aug 2021 at 16:06:30]:
            MetaMask - A crypto wallet & gateway to blockchain apps

            Sy, [30 Aug 2021 at 16:06:30]:
            ...“You will need metamask to interact with elys.money please get it here
            metamask logo linking to https://metamask.io/“

            https://metamask.io/images/mm-logo.svg

        */
        if(this.state.loading){
            return (
                <div style={{display: 'flex', position: 'relative', minHeight: 700}}>
                        <Loading />
                </div>
            )
        } else {

            if(this.state.hasMetamask && !this.state.isConnected){
                return (
                    <div style={{display: 'flex', position: 'relative', minHeight: 700}}>
                            <Connect connect={this.connect}/>
                    </div>
                )
            } else if (!this.state.hasMetamask){
                if(isMobile){
                    return (
                        <div style={{display: 'flex', position: 'relative', minHeight: 700, width: '100%', flexDirection: 'column'}}>
                            <div style={{
                                display: 'block', 
                                width: '90%', 
                                marginLeft: 'auto', 
                                marginRight: 'auto', 
                                textAlign: 'center',
                                marginTop: 150,
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>
                                You need to use the Metamask DAPP browser to interact with elys.money
                            </div>
                            <a href="https://metamask.app.link/dapp/elys.money" style={{
                                textDecoration: 'none', 
                                display: 'block', 
                                padding: 10, 
                                backgroundColor: '#ffffff', 
                                textAlign: 'center', 
                                marginTop: 40, 
                                width: 300, 
                                marginLeft: 'auto', 
                                marginRight: 'auto',
                                borderRadius: 5
                                }}>
                                <img src="https://metamask.io/images/mm-logo.svg" width={200} alt="metamask" />
                            </a>
                        </div>
                    )
                }
                return (
                    <div style={{display: 'flex', position: 'relative', minHeight: 700, width: '100%', flexDirection: 'column'}}>
                            <div style={{
                                display: 'block', 
                                width: '90%', 
                                marginLeft: 'auto', 
                                marginRight: 'auto', 
                                textAlign: 'center',
                                marginTop: 150,
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>
                                You will need metamask to interact with elys.money please get it here:
                                <a href="https://metamask.io/" target="_blank" rel="noreferrer" style={{
                                    textDecoration: 'none', 
                                    display: 'block', 
                                    padding: 10, 
                                    backgroundColor: '#ffffff', 
                                    textAlign: 'center', 
                                    marginTop: 40, 
                                    width: 300, 
                                    marginLeft: 'auto', 
                                    marginRight: 'auto',
                                    borderRadius: 5
                                }}>
                                    <img src="https://metamask.io/images/mm-logo.svg" alt="metamask" />
                                </a>
                            </div>
                    </div>
                )
            } else if (window.ethereum.networkVersion!=='250'){
                return (
                    <div style={{display: 'flex', position: 'relative', minHeight: 700, width: '100%', flexDirection: 'column'}}>
                        <div style={{
                                display: 'block', 
                                width: '90%', 
                                marginLeft: 'auto', 
                                marginRight: 'auto', 
                                textAlign: 'center',
                                marginTop: 150,
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>Your network needs to be set to Fantom Opera in Metamask.<br /><br />
                            You can find instructions <a href="https://docs.fantom.foundation/tutorials/set-up-metamask" rel="noreferrer" style={{color: '#dddddd'}}>here</a>
                            
                        </div>

                    </div>

                )
            } else {
                return (
                    <div style={{display: 'flex', position: 'relative', minHeight: 700}}>
                        {this.props.children}
                    </div>
                )
            }
        }
        
    }

}

export default PageWrapper