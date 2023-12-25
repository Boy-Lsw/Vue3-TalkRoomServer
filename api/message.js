import query from '../database/index.js'

const send = body => {
  const column = 'content, sender, receiver, sendTime'
  const { content, sender, receiver, sendTime } = body
  const values = `'${content}', '${sender}', '${receiver}', '${sendTime}'`
  return query(`insert into messages (${column}) values (${values})`)
}

const list = async body => {
  const { username, currentChater } = body
  let result1 = await query(`select * from messages where sender='${username}' and receiver='${currentChater}'`)
  let result2 = await query(`select * from messages where sender='${currentChater}' and receiver='${username}'`)
  return [...result1, ...result2].sort((a, b) => a.id - b.id)
}

const messageApi = {
  send,
  list
}

export default messageApi
