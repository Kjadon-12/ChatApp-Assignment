const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const port = 8082;
const app = express();
app.use(cors())

app.get('/', (req, res) => {
      res.send("Welcome to this platform")
})


const server = http.createServer(app);
const io = socketIO(server)
const usersList = { }

io.on("connection",(socket)=>{
    console.log("New Connection")
    
    socket.on('joined' , ({userName})=>{
        usersList[socket.id] = userName;
        socket.emit("welcome" , {user: 'Admin' , message:`${userName} Welcome to the chat`})
        socket.broadcast.emit('userJoined' , {user: 'Admin' , message: `${usersList[socket.id]} has joined the chat`})
        
    })

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:usersList[socket.id],message,id});
    })


    socket.on('disconnect', ()=>{
        console.log("User Left")
        socket.broadcast.emit('leave' , {user: 'Admin', message: `${usersList[socket.id]} User has left`})
    })
   


    
})


server.listen(port , () => {
    console.log("Server is running on port " + port);
})