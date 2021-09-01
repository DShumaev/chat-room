import Database from './database.js'

class ControllerHTTP {


    joinedToRoom(req, res) {
        try {
            const {userName} = req.body
            const roomID = 'room_' + userName
            if (!Database.isRoomInDB(roomID))
                Database.createRoomInDB(roomID)
            res.json({...req.body, roomID})   // возвращаем клиент с созданным на сервере roomID
        } catch (e) {
            console.log(e)
        }
    }


    getUsersAndMessageForRoom(req, res) {
        try {
            const roomID = req.query.roomID
            let obj = null
            if (Database.isRoomInDB(roomID)) {
                obj = {
                    users: Database.getUsersCurrentRoom(roomID),
                    messages: Database.getMessageCurrentRoom(roomID)
                }
            } else {
                obj = {
                    users: [],
                    messages: []
                }
            }
            res.json(obj)
        } catch (e) {
            console.log(e)
        }
    }
}


export default new ControllerHTTP()