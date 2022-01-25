const { Server } = require("socket.io");

const io = new Server({
  // options
  cors: {
    origin: "*",
    allowedHeaders: "*",
    credentials: true
  }
});

const rooms = {};

io.on("connection", (socket) => {
  // console.log('Socket', socket);
    socket.on('join-room', ({ playerName, room }) => {
      console.log('Init', playerName, room);
      if (!playerName || !room) return;
      if (!rooms[room]) rooms[room] = { players: [], cards: [] };
      if (rooms[room].players.some((player) => player.playerName === playerName)) return;

      rooms[room].players.push({ playerName, socketId: socket.id });
      socket.join(room);
      console.log('Join room', playerName, room);
      socket.emit('room-state', rooms[room]);
    })

    socket.on('add-card-on-table', ({ room, card }) => {
        console.log('Add card', room, card)
        rooms[room].cards.push(card);
        socket.to(room).emit('new-card-on-table', card);
    })

    socket.on('remove-card-on-table', ({ room, card }) => {
      console.log('ROOMS', socket.rooms);
      rooms[room].cards = rooms[room].cards.filter((roomCard) => roomCard.playerName + roomCard.id !== card.playerName + card.id);
      socket.to(room).emit('delete-card-on-table', card);
    })

    socket.on("disconnecting", () => {
      console.log('Disconnect', socket.rooms);
      socket.rooms.forEach((room) => {
        if (rooms[room]) {
          rooms[room].players = rooms[room].players.filter((player) => player.socketId !== socket.id)
        }
      });
    });
});

io.listen(3002);
console.info('listen to', 'http://localhost:3002');
