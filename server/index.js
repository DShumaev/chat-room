import express from 'express'
import {Server as ioSocket} from 'socket.io'
import {createServer} from 'http'
import config from 'config'
import cors from 'cors'
import Database from './database.js'
import router from "./router.js"
import path from 'path'



const PORT = config.get('port') || 5000


const app = express()
app.use(cors())
const httpServer = createServer(app)
const io = new ioSocket(httpServer)
app.use(express.json())
app.use(router)
app.use(express.urlencoded({extended: true}))




//--- PRODUCTION ---//

const PROD = true

if (PROD === true) {
    const dirname = path.resolve()
    app.use(express.static(path.resolve(dirname + '/../client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(dirname + '/../client/build/index.html'))
    })
}


// ------------------  ОБРАБОТКА СОКЕТ СОЕДИНЕНИЙ  -----------------------//

function startSocket() {

    io.on('connection', socket => {

        socket.on('ROOM:JOIN', ({roomID, userName}) => {
            try {
                if (roomID !== null && roomID !== undefined && userName !== null && userName !== undefined) {
                    socket.join(roomID)         // подключаемся к определенной комнате
                    Database.addUserToRoom(roomID, socket.id, userName)        // фиксируем в БД сокет-соединение и пользователя для конкретной комнаты
                    let users = Database.getListUsersForRoom(roomID)
                    socket.to(roomID).emit('ROOM:SET_USERS', users)     // отправляем список всех пользователей для определенной комнаты
                } else {
                    throw new Error(`проблема с добавлением пользователя ${userName} в комнату ${roomID}`)
                }
            } catch (e) {
                console.log(e)
                console.log("проблема с обработкой добавления пользователя в комнату на сокет-соединении")
            }
        })


        socket.on('ROOM:NEW_MESSAGE_FROM_USER', ({roomID, userName, textMessage}) => {
            try {
                const dateObject = new Date()
                let year = dateObject.getFullYear()
                let date = ("0" + dateObject.getDate()).slice(-2)
                let month = ("0" + (dateObject.getMonth() + 1)).slice(-2)
                let hours = ("0" + dateObject.getHours()).slice(-2)
                let minutes = ("0" + dateObject.getMinutes()).slice(-2)
                let dateMessage = hours + ":" + minutes + "  " + date + "." + month + "." + year
                const message = {
                    userName,
                    textMessage,
                    dateMessage
                }
                if (roomID !== null && roomID !== undefined && userName !== null && userName !== undefined) {
                    socket.to(roomID).emit('ROOM:NEW_MESSAGE_FROM_SERVER', message)
                    Database.addMessageForUserToDB(roomID, message)
                } else {
                    throw new Error(`проблема с регистрацией нового сообщение от пользователя ${userName}`)
                }
            } catch (e) {
                console.log(e)
                console.log("проблема с обработкой регистрации нового сообщения от пользователя на сокет-соединении")
            }
        })


        socket.on('disconnect', () => {
            try {
                let roomsIdUserLeft = Database.getRoomsIdBySocketId(socket.id)
                if (Database.removeUserFromRooms(socket.id) || (roomsIdUserLeft.length > 0)) {
                    roomsIdUserLeft.forEach((roomID) => {
                        let users = Database.getListUsersForRoom(roomID)
                        socket.to(roomID).emit('ROOM:SET_USERS', users)
                    })
                }
            } catch (e) {
                console.log(e)
                console.log("проблема при обработке дисконнекта пользователя на сокет-соединении")
            }
        })
    })
}


function start() {
    try {
        httpServer.listen(PORT, () => {console.log(`SERVER STARTED ON PORT ${PORT}`)})
    } catch (e) {
        console.log(e)
        console.log("проблема с запуском HTTP-сервера")
    }
    try {
        startSocket()
    } catch (e) {
        console.log(e)
        console.log("проблема с организацией сокет-соединений")
    }
}



//--- Запуск серверной части ---//

start()

