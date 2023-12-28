import express from 'express'
import router from './router/index.js'
import bodyParser from 'body-parser'
import { expressjwt } from 'express-jwt'
import { secretKey } from './database/config.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { socketServer } from './socket/index.js'

const port = 3000
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: true })
socketServer(io)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})
app.use(
  expressjwt({ secret: secretKey, algorithms: ['HS256'] }).unless({
    path: [/^\/auth/]
  })
)
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token'
    })
  }
  res.send({
    status: 500,
    message: '未知的错误'
  })
})
app.use(router)

httpServer.listen(port, () => {
  console.log(`server run in port ${port}!`)
})
