import './index.css'
import socket from "./socket"
import JoinBlock from "./component/JoinBlock"
import Chat from './component/Chat'
import {useReducer, useEffect} from 'react'
import reducer from "./reducer"
import axios from "axios"


function App() {
    const [state, dispatch] = useReducer(reducer, {
        isJoined: false,
        userName: null,
        users: [],
        messages: [],
        currentRoomID: null,
        allRoomID: []
    })


    const onLogin = async (userData) => {
        dispatch({
            type: 'JOINED',
            payload: userData
        })
        await setUsersAndMessages(userData)
    }


     const setUsersAndMessages = async (userData) => {
        try {
            socket.emit('ROOM:JOIN', userData)    // оправка сообщения через сокет (RoomID должен быть в userData) / добавление socketID на сервере
        } catch (e) {
            console.log(e)
            console.log("проблема с отправкой сообщения на сервер")
        }
        try {
            const {data} = await axios.get(`/room?roomID=${userData.roomID}`)  // запрашиваем данные по пользоватаелям и сообщениям в выбранной комнате
            // data = {users: [], messages: []}
            dispatch({
                type: 'SET_DATA',
                payload: data
            })
        } catch (e) {
            console.log(e)
            console.log("проблема при получении информации по конкретной комнате (для отображения у себя)")
        }
    }


    const setCurrentRoomID = (currentRoomID) => {
        dispatch({
            type: 'SET_CURRENT_RoomID',
            payload: currentRoomID
        })
    }


    const setAllRoomIdList = (room) => {
        dispatch({
            type: 'SET_ROOMS_LIST',
            payload: room
        })
    }


    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users
        })
    }


    const addMessage = (message) => {
        dispatch({
            type: 'NEW_MESSAGE', // message = {userName: userName, textMessages: some_text, dateText:}
            payload: message
        })
    }


    useEffect(() => {
        socket.on('ROOM:SET_USERS', setUsers)
        socket.on('ROOM:NEW_MESSAGE_FROM_SERVER', addMessage)
    }, [])


     return (
        <div className="wrapper">
            {(!state.isJoined) ?
            <JoinBlock onLogin={onLogin} setListAllRoom={setAllRoomIdList}/>
            :
            <Chat
                {...state}
                onAddMessage={addMessage}
                updateUsersAndMessagesList={setUsersAndMessages}
                setCurrentRoom={setCurrentRoomID}
            />}
        </div>
    )
}


export default App
