import React from 'react'
import socket from '../socket'


function Chat({users, messages, userName, currentRoomID, onAddMessage,
              allRoomID, updateUsersAndMessagesList, setCurrentRoom}) {

    const [messageText, setMessageText] = React.useState('')
    const messagesRef = React.useRef(null)

    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE_FROM_USER', {
            roomID: currentRoomID,
            userName,
            textMessage: messageText
        })

        let dateObject = new Date()
        let year = dateObject.getFullYear()
        let date = ("0" + dateObject.getDate()).slice(-2)
        let month = ("0" + (dateObject.getMonth() + 1)).slice(-2)
        let hours = ("0" + dateObject.getHours()).slice(-2)
        let minutes = ("0" + dateObject.getMinutes()).slice(-2)
        let dateMessage = hours + ":" + minutes + "  " + date + "." + month + "." + year

        onAddMessage({userName, 'textMessage': messageText, dateMessage})   //  доавляем свою дату
        setMessageText('')
    }


    React.useEffect(() => {
        messagesRef.current.scrollTo(0, 99999)
    }, [messages])


    return (
        <div className="chat">
            <div className="chat-users">
                <b>Rooms:</b>
                <ul>
                    {allRoomID.map((roomID, index) =>
                    <li key={roomID + index}
                        onClick={() => {
                        setCurrentRoom(roomID)
                        updateUsersAndMessagesList({roomID, userName})
                        window.history.replaceState({},`Chat ${roomID}`,`/room?roomID=${roomID}`)  // Заменяем URL в адресной строке браузера
                        }}>
                        {(roomID === currentRoomID) ? <b>{roomID}</b> : roomID}
                    </li>)}
                </ul>
                <hr />
                <b>Online ({users.length}):</b>
                <ul>
                    {users.map((name, index) => (
                        <li key={name + index}>
                            {(name === userName) ? <b>{name}</b> : name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chat-messages">
                <div ref={messagesRef} className="messages">
                    {messages.map((message, index) => (
                        message.userName === userName ?
                        <div key={"qw" + index} className="myMessage">
                            <p>{message.textMessage}</p>
                            <div>
                                <span>
                                    {`${message.userName} ${message.dateMessage}`}
                                </span>
                            </div>
                        </div>
                            :
                        <div key={"er" + index} className="message">
                            <p>{message.textMessage}</p>
                            <div>
                                <span>
                                    {`${message.userName} ${message.dateMessage}`}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <form>
          <textarea value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    className="form-control"
                    rows="3">
          </textarea>
                    {(messageText.length !== 0) ?
                    <button onClick={onSendMessage}
                            type="button"
                            className="btn btn-primary">
                        Send message
                    </button>
                    :
                    <button disabled={true}
                            type="button"
                            className="btn btn-primary">
                        Send message
                    </button>}
                </form>
            </div>
        </div>
    )
}


export default Chat