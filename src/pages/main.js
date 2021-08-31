import React, { Component } from 'react'
import Banner from '../components/banner'
import Intro from './intro'
import UnlockPage from './unlock'
import FarmPage from './farm'
import SwapPage from './swap'
import Footer from '../components/footer'
import SideMenu from '../components/sidemenu'
import Hamburger from '../components/hamburger'
import elysPrice from '../lib/elysprice'
import {isMobile} from 'react-device-detect';

import PageWrapper from '../components/pagewrapper'

import detectEthereumProvider from '@metamask/detect-provider'

class Main extends Component {
    state = {
        elysPrice: {usd:0,ftm:0,loaded: false},
        sideMenuHidden: isMobile?true:false,
        page: 'home'
    }
    componentDidMount = () => {
        let page = sessionStorage.getItem("page")
        if(page)this.setState({page})
    }
    checkMetamask = async () => {
        let provider = await detectEthereumProvider()
        if (provider) {
            window.ethereum = provider
            return true //window.ethereum.isMetaMask 
        }
        return false
    }
    getPrice = async () => {
        let price = await elysPrice.get()
        if(price.usd===0 || price.ftm===0){
            let tryAgain = () => {
                return new Promise(resolve=>{
                    let i = setInterval(async () => {
                        let price = await elysPrice.get()
                        if(price.usd!==0 && price.ftm!==0){
                            clearInterval(i)
                            resolve(price)
                        }
                    },1000)
                })
            }
            price = await tryAgain()
        }
        return price
    }
    connected = async () => {
        let price = await this.getPrice()
        this.setState({connected:true,elysPrice: price})
        setInterval(async () => {
            let price = await this.getPrice()
            price.loaded = true
            this.setState({connected:true,elysPrice: price})
        },120000)
    }
    gotoPage = (page) => {
        this.hideSideBar()
        if(page==='homepage'){
            window.location.href="https://www.elyseos.com"
            return
        }
        sessionStorage.setItem("page",page)
        this.setState({page: page})
    }
    hamburgerClick = () => {
        if(!isMobile) return
        this.setState({sideMenuHidden:!this.state.sideMenuHidden})
    } 
    hideSideBar = () => {
        if(!isMobile) return
        this.setState({sideMenuHidden:true})
    }
    render = () => {
       let body = null
        switch(this.state.page){
            default:
            case 'home':
                body = (<PageWrapper connected={this.connected}>
                    <Intro price={this.state.elysPrice}/>
                </PageWrapper>)
                break
            case 'token':
                body = (<PageWrapper connected={this.connected}>
                    <UnlockPage />
                </PageWrapper>)
                break
            case 'farm':
                body = (<PageWrapper connected={this.connected}>
                    <FarmPage />
                </PageWrapper>)
                break
            case 'swap':
                body = (<PageWrapper connected={this.connected}>
                    <SwapPage />
                </PageWrapper>)
                break
                
        }


        return (
            <div style={{position: 'relative', width: '100%', height: '100%', display: 'flex'}} id="main">
                <SideMenu hidden={this.state.sideMenuHidden}  page={this.state.page} price={this.state.elysPrice} connected={this.state.connected} gotoPage={this.gotoPage} click={this.hideSideBar}/>
                <Hamburger click={this.hamburgerClick} hide={!isMobile || !this.state.sideMenuHidden} left={15} top={28} />
                <div style={{display: 'inline-block',width: '100%',verticalAlign: 'top', position: 'relative'}}>
                    <Banner />
                    {body}
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Main