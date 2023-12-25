import express from 'express'
import messageApi from '../../api/message.js'

const router = express.Router()

router.use('/send', async (req, res) => {
  await messageApi.send(req.body)
  res.send({
    code: '200',
    msg: '发送成功!'
  })
})

router.use('/list', async (req, res) => {
  let result = await messageApi.list(req.body)
  res.send({
    code: '200',
    msg: '查询成功!',
    data: result
  })
})

// router.use('/', (req, res) => {
//   res.send('message')
// })

export default router
