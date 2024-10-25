const PORT = process.env.PORT || 3000;

const io = require("socket.io")(PORT, {
    cors: {
        // origin: ["http://localhost:8080"]
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