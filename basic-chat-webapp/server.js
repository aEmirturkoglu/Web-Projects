const io = require('socket.io')(3000, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
  }
});

const users = {}

io.on('connection', socket => {
  //console.log('new user');
  //socket.emit('chat-message', 'hello world')
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    console.log(message);
    socket.broadcast.emit('chat-message', {message: message, name: users[socked.id]})
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id] 
  })
})
