require('dotenv').config();
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const app = express();

const server = http.createServer(app)

app.use(express.static(require('path').join(__dirname, '..' ,'public')))

const io = socketio(server);
var count = 0;


io.on('connection', function(socket) {
    count++;
    console.log('A user connected');
    // console.log(socket.id);
    io.emit('totalUsers', count)

   socket.on('chat msg', (msg) => {
       console.log(msg)
       io.emit('chat msg', msg);
   })
   
   socket.on('disconnect', function () {
    count--;
    io.emit('totalUsers', count)
      console.log('A user disconnected');
   });
});

server.listen(process.env.PORT, () => {
    console.log(`'app is running at http://localhost:${process.env.PORT}`)
})
