const PORT = process.env.PORT || 3000;

const io = require("socket.io")(PORT, {
    cors: {
        // origin: ["http://localhost:8080"]
        origin: "*",
    },
});

io.on("connection", (socket) => {
    socket.stateObj = {};
    socket.on("update-stateObj-server", (newObj) => {
        for (const key in newObj) {
            socket.stateObj[key] = newObj[key];
        }
        socket.broadcast.emit("new-user-joined", socket.stateObj.name);
    });
    socket.on("send-message-server", (name, message) => {
        socket.broadcast.emit("send-message-client", name, message);
    });
    socket.on("disconnect", () => {
        socket.broadcast.emit("disconnect-client", socket.stateObj.name);
    });
});
