import {isMobile} from 'react-device-detect';

import Stats from '../components/stats'

const Intro = (props) => (
    <div style={{
        fontSize: 15,
        fontWeight: 700,
        textAlign: 'center',
        display: 'block',
        maxWidth: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 40,
        padding: 5
    }}>
        <div style={{padding: '10', width: '80%', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
        This is the home of the ELYS token. <br />ELYS is the native token of the Elyseos Sacramental Medicine ecosystem. <br /> To find out more visit;
        <a href="https://www.elyseos.com" style={{
            display: 'block',
            fontSize: 25,
            color: '#ffffff',
            textDecoration: 'none',
            marginTop: 10
        }}>www.elyseos.com</a>
        </div>
        <div style={{maxWidth: isMobile?350:460, marginLeft: 'auto', marginRight: 'auto', marginTop: 30}}>
            Elys.money is for interacting with the Token itself. You can:
            <ul style={{textAlign: 'left'}}>
                <li style={{padding: 5}}>Stake your liquidity for 3, 6, 12 months to earn ELYS rewards</li>
                <li style={{padding: 5}}>Long-term stake your ELYS to earn ELYS rewards</li>
                <li style={{padding: 5}}>Bridge from ELYS to ETH</li>
                <li style={{padding: 5}}>Get tools to accept ELYS on your website</li>
                <li style={{padding: 5}}>Find vendors who accept ELYS</li>
            </ul>
        </div>
        <Stats price={props.price} />
    </div>
)

export default Intro

