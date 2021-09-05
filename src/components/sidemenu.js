import {isMobile} from 'react-device-detect';
import twitter from "../images/twitter-black-icon.png"
import github from "../images/github-black-icon.png"
import medium from "../images/medium-black-icon.png"
import email from "../images/email-icon.png"
import discord from "../images/discord-black-icon.png"
import telegram from "../images/telegram-black-icon.png"

import logo from '../images/logo.png'
import ftmlogo from '../images/ftmlogo.png'

const orange = '#ec7019'

let trimDec = (n,dec) => {
    let ar = n.toString().split('.')
    if(ar.length===1) return ar[0]
    ar[1] = ar[1].substr(0,dec)
    return ar.join('.')
}

const Icon = (props) => {
    return (
        <a href={props.href} style={{
            textDecoration: 'none',
            width: 80,
            textAlign: 'center',
            display: 'inline-block'
        }} target="_blank" rel="noreferrer"><img style={{
            verticalAlign: 'top',  
            margin: 13
        }}
        src={props.src} alt={props.alt} href={props.href} height={22}/></a>
    )    
}

const Link = (props) => {
    let style = {
        border: 'none',
        color: orange,
        fontSize: 17,
        backgroundColor: 'transparent',
        display: 'block',
        marginTop: 25
    }
    if(props.page===props.current){
        style.fontWeight = 'bold'
    }
    return (
        <button style={style} onClick={()=>props.gotoPage(props.page)}>{props.children}</button>
    )
}

const Logo = (props) => {
    return (
        <a style={{padding: 20, width: 210, marginLeft: 'auto', marginRight: 'auto',
        textAlign: 'center', textDecoration:'none', display: 'block'}} href="https://elyseos.com" target="_blank" rel="noreferrer">
            <img src={logo} width={70} alt="logo"/>
            <div style={{
                display: 'inline-block', 
                fontSize: 24, 
                fontWeight: 'bold', 
                color: '#000000', 
                verticalAlign: 'top', 
                marginTop: 20, 
                marginLeft: 10
            }}>
                ELYS Token
            </div>
        </a>
    )
}

const Price = (props) => {
    return <a style={{ 
        width: 200,
        display: 'block',
        marginRight: 'auto',
        marginLeft: 'auto',
        borderTop: 'solid 2px' + orange,
        borderBottom: 'solid 2px' + orange,
        color: '#000000',
        fontSize: 17,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        textDecoration: 'none'
    }} href="https://kek.tools/t/0xd89cc0d2a28a769eadef50fff74ebc07405db9fc" target="_blank" rel="noreferrer">
        <img src={logo} width={30} alt="ElysLogo" />
        <div style={{display: 'inline-block', marginLeft: 10, verticalAlign: 'top', marginTop: 5}}>
            ${trimDec(props.price.usd,2)}
        </div>
        <div style={{display: 'inline-block', marginLeft: 10, verticalAlign: 'top', marginTop: 5}}>
            =
        </div>
        <img src={ftmlogo} alt="FTMLogo" width={16} style={{position: 'relative', top: -2, marginLeft: 10}}/>
        <div style={{display: 'inline-block', marginLeft: 10, verticalAlign: 'top', marginTop: 5}}>
            {trimDec(props.price.ftm,2)}
        </div>
         
        
    </a>
}


const Menu = (props) => {
    console.log(props)
    let style={
        display: 'inline-block',
        backgroundColor: '#facbac',
        flex: '0 0 280px',
        position:  (isMobile)?'absolute':'relative',
        left: (isMobile)?(props.hidden)?-300:0:0,
        transition: '0.5s',
        top:  0,
        bottom: 0,
        verticalAlign: 'top',
        zIndex: '90',
        borderRight: 'solid 2px ' + orange
    }

    /*
    <Link current={props.page} gotoPage={props.gotoPage} page={'plugins'}>Plugins & Tools</Link>
    <Link current={props.page} gotoPage={props.gotoPage} page={'farm'}>Permaculture Farm</Link>
    */
    return (
        <div style={style} onClick={props.click}>
            <Logo />
            <Price price={props.price} connected={props.connected}/>
            <div style={{
                width: 230,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 40,
                display: 'block'
            }}>
                <Link current={props.page} gotoPage={props.gotoPage} page={'home'}>Home</Link>
                <Link current={props.page} gotoPage={props.gotoPage} page={'farm'}>Permaculture Farm</Link>
                <Link current={props.page} gotoPage={props.gotoPage} page={'token'}>Unlock Tokens</Link>
                <Link current={props.page} gotoPage={props.gotoPage} page={'swap'}>Swap @ ZooDEX</Link>
                
                <Link current={props.page} gotoPage={props.gotoPage} page={'homepage'}>Elyseos Homepage</Link>
                
            </div>
            <div style={{
                display: 'inline-block',
                right: 0,
                width: '100%',
                marginTop: 0,
                textAlign: 'center',
                position: 'absolute',
                bottom: 20
            }}>
                <Icon src={twitter} alt="twitter" href="https://twitter.com/ElyseosFDN"/>
                <Icon src={telegram} alt="telegram" href="https://t.me/joinchat/kJCUkY1WacpkZTVk"/>
                <Icon src={github} alt="github" href="https://github.com/elyseos/contracts"/>
                <Icon src={medium} alt="medium" href="https://medium.com/@Elyseos"/>
                <Icon src={email} alt="email" href="https://www.elyseos.com/email-signup"/>
                <Icon src={discord} alt="discord" href="https://discord.gg/YKJsDyHDkc"/>
            </div>
        </div>
    )
}

export default Menu