import query from '../database/index.js'
import bcryptjs from 'bcryptjs'

const register = async data => {
  const column = 'username, password, avatar'
  const { username, password, avatar } = data
  const hash = bcryptjs.hashSync(password, 10)
  const values = `'${username}', '${hash}', '${avatar}'`
  return query(`insert into user (${column}) values (${values})`)
}

const login = username => {
  return query(`select * from user where username = '${username}'`)
}

const authApi = {
  register,
  login
}

export default authApi
