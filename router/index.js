import express from 'express'
import AuthRouter from './routes/auth.js'

const router = express.Router()

router.use('/auth', AuthRouter)

export default router
