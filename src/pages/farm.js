import cannabis from '../images/cannabis-white-icon.png'
import iboga from '../images/iboga-white-icon.png'
import {isMobile} from 'react-device-detect';

const orange = '#ec7019'

const Farm = (props) => {
    let style={
        padding: 5,
        fontWeight: 'bold',
        marginLeft: 10
    }
    return (
        <div style={{
            border: 'solid 2px ' + orange,
            borderRadius: 10,
            width: 300,
            fontSize: 20,
            display: 'inline-block',
            padding: 10,
            margin: 20,
            height: 280,
            fontWeight: 'bold',
            verticalAlign: 'top'
        }}>
            <img src={props.icon} alt='icon' width={30} />
            <div style={{
                display: 'inline-block', 
                color: orange, 
                verticalAlign: 'top', 
                marginTop: 3, 
                marginLeft: 20,
                fontSize: 20,
                marginBottom: 20
            }}>{props.title}</div>
            <div style={style}>{props.pair} {props.pairType}</div>
            <div style={style}>Lock time = {props.lockTime}</div>
            <div style={style}>Return = {props.return}</div>
            <div style={style}>Paid in {props.paidIn}</div>
            <div style={style}>APR = {props.apr}</div>
            <button style={{
            display: 'block',
            backgroundColor: '#ffffff',
            border: '1px solid #ffffff',
            borderRadius: 15,
            padding: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 10,
            fontSize: 18,
            fontWeight: 500,
            color: '#ed6f1b',
            width: 150,
            height: 40
        }} >Coming Soon</button>
        </div>
    )
}


const FarmPage = (props) => {
    return (<div style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: 40, width: isMobile?370:730}}>
        <Farm icon={cannabis} title={'The Grow'} pair={'FTM-ELYS'} pairType={'LP Lock'} lockTime={'3, 6, 12 Months'} return={'4%, 10%, 24%'} apr={'16 - 24%'} paidIn={'ELYS'}/>
        <Farm icon={iboga} title={'The Forest'} pair={'FTM-ELYS'} pairType={'Single token Lock'} lockTime={'12, 24, 36 Months'} return={'12%, 32%, 60%'} apr={'12% - 20%'} paidIn={'ELYS'}/>
        
    </div>)
}

export default FarmPage
