

const Notification = ({ message, result }) => {
    const messageStyle = {
        width: '100%',
        border: '3px green solid',
        borderRadius: 6,
        color: 'green',
        backgroundColor: 'gray',
        padding: 20,
        marginBottom: 10,
        fontSize: 22,
        display: 'none'
    }

    if (result === 'error'){
        messageStyle.color = 'red'    
        messageStyle.border = '3px red solid'
    }
    

    if (message === null) {
        return null
    }

    messageStyle.display = 'block'
    return (
      <div className="error" style={messageStyle}>
        {message}
      </div>
    )
  }

export default Notification