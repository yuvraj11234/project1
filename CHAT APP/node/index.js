// //NODE server will handel socket IO connection
// // const io = require("socket.io");
// const express=require('express');
// const app=express();

// // const io = require("socket.io")(httpServer, {
// // });
// const io = require("socket.io")(httpServer);

// // io.on("connection", (socket) => {
// //   console.log('connected');
// // });

// httpServer.listen(8000);
// const users={};
// io.on('connection',socket=>{
//     socket.on('new-user-joined',name => {
//          console.log('new-user', name);
//          users[socket.id]=name;
//          socket.broadcast.emit('user-joined', name);
//     }); 
//     socket.on('send',message=>{
//         socket.broadcast.emit('receive',{message:'message', name:users[socket.id]}) 
//     })
// });

// const express=require('express');
// // const io = require('socket.io');nn
// const app=express();
// const http = require("http").createServer(app);
// const Port=process.env.Port || 3000
// http.listen(Port,()=>{
//     console.log(`Listening on port 3000`)
// });

// app.use(express.static(__dirname + '/public'));

// const io=require('socket.io')(http)

// io.on('connection',(socket)=>{
//     console.log("coonected");
// });

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname +'/index.html' )
// })

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
const user = {}
io.on("connection", (socket) => {

    socket.on('new-user-joined', name => {
        user[socket.id] = name;
        // console.log(names);
        socket.broadcast.emit('user-joined', name);
    })
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, names: user[socket.id] })
    })
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', user[socket.id])
        delete user[socket.id]
    })
});



httpServer.listen(3000, () => {
    console.log("listening on port 3000")
});