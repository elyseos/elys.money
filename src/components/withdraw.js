function Withdraw(props) {
    if(props.amount===0) return (<div></div>)
    if(props.error) return (
        <div style={{
            display: 'block',
            backgroundColor: '#ed6f1b',
            border: '1px solid #ffffff',
            borderRadius: 20,
            padding: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 50,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#ffffff',
            width: 300,
            textAlign: 'center'
        }}>Something went wrong :( Please try again</div>
    )
    if(props.waiting) return (
        <div style={{
            display: 'block',
            backgroundColor: '#ed6f1b',
            border: '1px solid #ffffff',
            borderRadius: 20,
            padding: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 50,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#ffffff',
            width: 250,
            textAlign: 'center'
        }}>Processing withdrawal..</div>
    )
    return (
        <button style={{
            display: 'block',
            backgroundColor: '#ffffff',
            border: '1px solid #ffffff',
            borderRadius: 20,
            padding: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 50,
            fontSize: 18,
            fontWeight: 500,
            color: '#ed6f1b',
            width: 250,
            cursor: 'pointer'
        }} onClick={props.withdraw}>Withdraw {props.amount} ELYS</button>
    );
  }
  
  export default Withdraw;