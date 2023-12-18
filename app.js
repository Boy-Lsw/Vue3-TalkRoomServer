import express from 'express'
import router from './router/index.js'
import bodyParser from 'body-parser'

const port = 3000
const app = express()

app.use(bodyParser.json())
app.use(router)

app.listen(port, () => {
  console.log(`server run in port ${port}!`)
})
