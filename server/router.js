import Router from 'express'
import ControllerHTTP from './controller.js'


const router = Router()


router.post('/room', ControllerHTTP.joinedToRoom)
router.get('/room', ControllerHTTP.getUsersAndMessageForRoom)


export default router