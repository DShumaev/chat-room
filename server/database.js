class Database {

    rooms = new Map();

    checkDataStr(value) {
        if ((value !== undefined) && (value !== null) && (typeof(value) === 'string') && (value.length > 0)) {
            return true
        } else {
            return false
        }
    }


    isRoomInDB(roomID) {
        try {
            if (!this.checkDataStr(roomID)) {
                throw new Error("roomID некорректен")
            }
            if (this.rooms.has(roomID)) {
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log(e)
        }
    }


    createRoomInDB(roomID) {
        try {
            if (!this.checkDataStr(roomID)) {
                throw new Error("roomID некорректен")
            }
            if (!this.rooms.has(roomID)) {
                this.rooms.set(
                    roomID,
                    new Map([
                        ['users', new Map()],
                        ['messages', []]
                    ]))
            }
        } catch (e) {
            console.log(e)
        }
    }


    getListUsersForRoom(roomID) {
        try {
            if (!this.checkDataStr(roomID)) {
                throw new Error("roomID некорректен")
            }
            if (this.rooms.has(roomID)) {
                return [...this.rooms.get(roomID).get('users').values()]
            }
            else {
                throw new Error(`нет такой комнаты ${roomID}`)
            }
        } catch (e) {
            console.log(e)
        }
    }


    addUserToRoom(roomID, socketID, userName) {
        try {
            if (!this.checkDataStr(roomID)) {
                throw new Error("roomID некорректен")
            }
            if (!this.checkDataStr(socketID)) {
                throw new Error("socketID некорректен")
            }
            if (!this.checkDataStr(userName)) {
                throw new Error("userName некорректен")
            }
            if (this.rooms.has(roomID)) {
                this.rooms.get(roomID).get('users').set(socketID, userName)
            }
            else {
                throw new Error(`нет такой комнаты ${roomID}`)
            }
        } catch (e) {
            console.log(e)
        }
    }


    removeUserFromRooms(socketID) {
        try {
            if (!this.checkDataStr(socketID)) {
                throw new Error("socketID некорректен")
            }
            let isDeleted = false
            this.rooms.forEach(room => {
                if (room.get('users').delete(socketID)) {
                    isDeleted = true
                }
            })
            if (isDeleted) {
                isDeleted = false
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log(e)
        }
    }


    getRoomsIdBySocketId(socketId) {
        try {
            const findedRoom = []
            this.rooms.forEach((room, room_id) => {
                if (room.get('users').has(socketId)) {
                    findedRoom.push(room_id)
                }
            })
            return findedRoom
        } catch (e) {
            console.log(e)
        }
    }


    getUsersCurrentRoom(roomID) {
        try {
            if (!this.checkDataStr(roomID)) {
                throw new Error("roomID некорректен")
            }
            return [...this.rooms.get(roomID).get('users').values()]
        } catch (e) {
            console.log(e)
        }
    }


    getMessageCurrentRoom(roomID) {
        try {
            if (!this.checkDataStr(roomID)) {
                throw new Error("roomID некорректен")
            }
            return [...this.rooms.get(roomID).get('messages').values()]
        } catch (e) {
            console.log(e)
        }
    }


    addMessageForUserToDB(roomID, message) {
        try {
            if (!this.checkDataStr(roomID)) {
                throw new Error("roomID некорректен")
            }
            if (('textMessage' in Object.keys(message)) && !this.checkDataStr(message.textMessage)) {
                throw new Error("в сообщении отсутствует текст сообщения")
            }
            if (('dateMessage' in Object.keys(message)) && !this.checkDataStr(message.dateMessage)) {
                throw new Error("в сообщении отсутствует отправитель")
            }
            if (this.rooms.has(roomID)) {
                this.rooms.get(roomID).get('messages').push(message)
            }
            else {
                console.log(`нет такой комнаты ${roomID}`)
            }
        } catch (e) {
            console.log(e)
        }
    }

}


export default new Database()

