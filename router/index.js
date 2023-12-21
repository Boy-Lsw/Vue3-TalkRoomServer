import express from 'express'
import AuthRouter from './routes/auth.js'
import UserRouter from './routes/user.js'
import MessageRouter from './routes/message.js'

const router = express.Router()

router.use('/auth', AuthRouter)
router.use('/user', UserRouter)
router.use('/message', MessageRouter)

export default router
