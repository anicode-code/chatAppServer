const io = require("socket.io")(3000, {
    cors: {
        origin: "*"
    }
})

io.on("connection", socket => {
    console.log(socket.id);
    socket.broadcast.emit("new-user-joined", socket.id);
    socket.on("send-message-server", message => {
        socket.broadcast.emit("send-message-client", socket.id, message);
    })
})