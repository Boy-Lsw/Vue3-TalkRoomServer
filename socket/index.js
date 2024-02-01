export const socketServer = io => {
  const roomList = {}
  let roomId = null
  let user = ''
  io.on('connection', socket => {
    console.log(`客户端${socket.id}已连接`)

    socket.on('joinRoom', data => {
      roomId = data.roomId
      user = data.user
      if (!roomList[roomId]) {
        roomList[roomId] = []
      }
      if (!roomList[roomId].includes(user)) {
        roomList[roomId].push(user)
      }
      socket.room = roomId
      socket.join(roomId)
      io.to(roomId).emit('sys', { msg: `${user}加入了房间`, roomId, users: roomList[roomId] })
    })

    socket.on('leave', () => {
      const index = roomList[roomId].indexOf(user) !== -1
      if (index !== -1) {
        roomList[roomId].splice(index, 1)
      }
      socket.leave(roomId)
      socket.room = null
      io.to(roomId).emit('sys', { msg: `${user}离开了房间`, roomId, users: roomList[roomId] })
      console.log(user + '退出了房间：' + roomId)
    })

    socket.on('sendMessage', () => {
      // 将该消息广播给其他客户端
      socket.broadcast.emit('showMessage')
      // 将消息发送给当前连接的客户端
      socket.emit('showMessage')
      return
    })

    socket.on('sendRoomMessage', data => {
      socket.emit('getRoomMessage', data)
      socket.to(roomId).emit('getRoomMessage', data)
      return
    })

    socket.on('disconnecting', () => {
      socket.broadcast.emit('quit', socket.id)
      console.log(`客户端${socket.id}已断开连接`)
    })
  })
}
