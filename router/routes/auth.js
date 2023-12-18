import express from 'express'
import authApi from '../../database/auth.js'

const router = express.Router()

router.use('/register', async (req, res) => {
  await authApi.register(req.body)
  // console.log(req.body)
  res.end('ok')
})

router.use('/login', (req, res) => {
  res.end('login')
})

export default router
