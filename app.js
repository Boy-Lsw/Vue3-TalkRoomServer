import express from 'express'
import router from './router/index.js'
import bodyParser from 'body-parser'
import { expressjwt } from 'express-jwt'
import { secretKey } from './database/config.js'

const port = 3000
const app = express()

app.use(bodyParser.json())
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

app.listen(port, () => {
  console.log(`server run in port ${port}!`)
})
