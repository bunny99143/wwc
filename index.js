const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('join', (name, callback) => {
 
        io.emit('chat message', { userName: "", msg:`${name} has joined.` });
 
        // Broadcast will send message to everyone
        // in the roomID except the joined user
        // socket.broadcast.to(roomID)
        //     .emit('message', { userName: "admin",
        //     msg: `${name}, has joined` });
 
        // socket.join(roomID);
 
        // io.to(user.room).emit('roomData', {
        //     room: user.room,
        //     users: getUsersInRoom(user.room)
        // });
        callback();
    })

    socket.on('chat message', (chatArr) => {
        io.emit('chat message', chatArr);
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});