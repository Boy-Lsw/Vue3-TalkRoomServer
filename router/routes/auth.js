import express from 'express'
import authApi from '../../api/auth.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import expressJWT from 'express-jwt'
import query from '../../database/index.js'
import { secretKey } from '../../database/config.js'

const validateUser = async (name, pass) => {
  const [user] = await query(`select * from user where username = '${name}'`)
  if (!user) return null
  let comparePassword = bcryptjs.compareSync(pass, user.password)
  const { password, ...result } = user
  if (comparePassword) {
    const token = jwt.sign({ username: user.username, sub: user.id }, secretKey, { expiresIn: '2h' })
    // console.log(token)
    return { ...result, token }
  } else return null
}

const router = express.Router()

router.use('/register', async (req, res) => {
  const { username } = req.body
  const flag = await authApi.login(username)
  if (flag.length) {
    res.send({
      code: '1001',
      msg: '该用户已经存在!'
    })
  } else {
    try {
      await authApi.register(req.body)
      res.send({
        code: '200',
        msg: '注册成功!'
      })
    } catch (error) {
      console.log(error)
    }
  }
})

router.use('/login', async (req, res) => {
  const { username, password } = req.body
  let result = await validateUser(username, password)
  if (result) {
    res.send({
      code: '200',
      msg: '登录成功!'
    })
  } else {
    res.send({
      code: '1002',
      msg: '请检查用户名或密码是否正确'
    })
  }
})

export default router
