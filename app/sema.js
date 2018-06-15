import http from 'http';
import socket from 'socket.io';
import dotenv from 'dotenv';
import app from '../sema.io';

const server = http.Server(app);
const io = socket(server);
dotenv.config();

io.on('connection', function (socket) {
  console.log("user connected")
  socket.emit('hello', { message: 'Howdy' })
});

server.listen(process.env.PORT, () => {
  console.log("App running on port ", process.env.PORT);
});