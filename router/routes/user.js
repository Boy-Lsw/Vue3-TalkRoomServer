import express from 'express'
import userApi from '../../api/user.js'

const router = express.Router()

router.use('/all', async (req, res) => {
  let result = await userApi.findAll()
  result.length
    ? res.send({
        code: 200,
        data: result
      })
    : res.send({
        code: 204,
        data: null
      })
})

router.use('/avatar', async (req, res) => {
  // console.log(req.body)
  const { username, avatar } = req.body
  if (username) {
    await userApi.uploadAvatar(username, avatar)
    res.send({
      code: '200',
      msg: '更换头像成功!',
      avatar
    })
  }
})

router.use('/hasavatar', async (req, res) => {
  const { username } = req.body
  const avatar = await userApi.hasAvatar(username)
  res.send({
    code: '200',
    hasavatar: avatar != null
  })
})

router.use('/', async (req, res) => {
  const { username } = req.query
  let [user] = await userApi.findOne(username)
  user
    ? res.send({
        code: '200',
        data: user
      })
    : res.send({
        code: '204',
        data: null
      })
})

export default router
