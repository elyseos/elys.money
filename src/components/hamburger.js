const Line = (props) => {
    let style={
        height: 4,
        width: 28,
        backgroundColor: '#ffffff',
        display: 'block',
        marginBottom: 7,
        marginLeft: 0,
        borderRadius: 2,
        position: 'relative',
        opacity: 0.6
    }
    return (<div style={style}></div>)
}

const Hamburger = (props) => {
    if(props.hide) return null
    return (<div style={{
        width: 40, 
        height: 40, 
        position: 'absolute', 
        left: props.left, 
        top: props.top,
        zIndex: 91
    }} onClick={props.click}>
        <Line/><Line/><Line/>
    </div>)
}

export default Hamburger