import React from 'react'
import {useState} from 'react'
import axios from "axios"


const JoinBlock = ({onLogin, setListAllRoom}) => {
    const [userName, setUserName] = useState('')
    const [isLoading, setLoading] = useState('')

    const inputUserName = (event) => {
        setUserName(event.target.value)
    }

    let userData = {userName}

    const enterChat = async () => {
        if (!userName) {
            return alert("Please, enter your name!")
        }
        setLoading(true)
        try {
            const response = await axios.post('/room', userData)
            userData = response.data  // добавляем полученный с сервера roomID
            setListAllRoom(userData.roomID)
            if (getEnterUrlLocation() && (getEnterUrlLocation() !== userData.roomID)) {   // если входим по соронней ссылке
                userData = {
                    userName: userData.userName,        // отображаем в первую очередь комнату в которую перешли по ссылке
                    roomID: getEnterUrlLocation()
                }
                setListAllRoom(userData.roomID)
            }
            window.history.replaceState({},`Chat ${userData.roomID}`,`/room?roomID=${userData.roomID}`)  // Заменяем URL в адресной строке браузера
            onLogin(userData)
        } catch (e) {
            console.log(e)
        }
    }


    const getEnterUrlLocation = () => {
        const url = new URL(window.location.href)
        if (url.searchParams.has('roomID')) {
            const location = url.searchParams.get('roomID')
            return location
        } else {
            return false
        }
    }


    return (
        <div className="join-block">
            <input
                value={userName}
                onChange={inputUserName}
                type="text" placeholder='Your name'
            />
            <button
                onClick={enterChat}
                className="btn btn-success"
            >
                {isLoading ? 'Starting': 'Start chat'}
            </button>
        </div>
    )
}


export default JoinBlock