const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;
const server = app.listen(PORT, () => console.log(`You've successfully connected to port:${PORT}`));
const io = require("socket.io")(server, { cors: true })


app.use = (cors())

io.on('connection', socket => { // listening
    console.log(`User Connected: ${socket.id}`)


    socket.on('joinRoom', roomNameInput => {
        socket.join(roomNameInput)
        console.log(`User ${socket.id} joined the ${roomNameInput} chat!`)
    })


    socket.on('sendSignInMsg', signInData => { 
        io.to(signInData.room).emit('receiveJoinRoomMsg', signInData)
        console.log(`${signInData.username} has signed on to the ${signInData.room} Chat`)
    })


    socket.on('sendchatmsg', msgData => {
        socket.to(msgData.room).emit('receivechatmsg', msgData);
        console.log(`Message in ${msgData.room} chat room from ${msgData.username}: "${msgData.message}"` )
    })

    socket.on('disconnect', () => {
        console.log("User has disconnected", socket.id)
    })

})

