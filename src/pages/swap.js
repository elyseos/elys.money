import zoodex from "../images/zoodex.png"
import {isMobile} from 'react-device-detect';

const SwapPage = (props) => {
    return (<div style={{
        display: 'block',
            width: isMobile?300:600,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 30,
            textAlign: 'center'
    }}>
        <div>If you wish to buy or sell ELYS you can swap FTM for ELYS at ZooDEX</div>
        <a href="https://dex.zoocoin.cash/orders/market?inputCurrency=FTM&outputCurrency=0xd89cc0d2A28a769eADeF50fFf74EBC07405DB9Fc"
        style={{
            textDecoration: 'none',
            color: '#ffffff',
            display: 'block',
            marginTop: 20,
            fontSize: 20,
            fontWeight: 'bold'

        }}>ZooDEX ELYS-FTM</a>
        <img src={zoodex} width={isMobile?300:600} alt="ZooDex" style={{
            display: 'block',
            width: isMobile?300:600,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 30
        }}/>
    </div>)
}

export default SwapPage
