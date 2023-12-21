import query from '../database/index.js'

const findOne = username => {
  return query(`select * from user where username = '${username}'`)
}
const findAll = () => {
  return query('select * from user')
}
const uploadAvatar = async (username, newAvatar) => {
  return query(`update user set avatar='${newAvatar}' where username='${username}'`)
}
const hasAvatar = async username => {
  const [user] = await query(`select * from user where username = '${username}'`)
  if (user && user.avatar) {
    return user.avatar
  } else return null
}

const userApi = {
  findOne,
  findAll,
  uploadAvatar,
  hasAvatar
}
export default userApi
