import { Server } from 'socket.io';

export const sio = server => {
  return new Server(server, {
    transports: ['polling'],
    cors: {
      origin: 'http://localhost:5173'
    }
  });
};

export const connection = io => {
  io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
      socket.join(room);

      socket.emit('message', username, 'Welcome to the chat!');

      socket.to(room).emit('message', username, 'join room ssuccess');

      socket.on('chatMessage', msg => {
        io.to(room).emit('message', username, msg);
      });

      socket.on('disconnect', () => {
        io.to(room).emit('message', `${username} has left the chat`);
      });
    });
  });
};
