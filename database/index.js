import config from './config.js'
import mysql from 'mysql2'

const connection = mysql.createConnection(config)

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    connection.execute(sql, values, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

export default query
