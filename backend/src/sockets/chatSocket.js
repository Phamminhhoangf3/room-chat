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

      socket.to(room).emit('message', username, `${username} đã vào phong chat!`);

      socket.on('chatMessage', msg => {
        io.to(room).emit('message', username, msg);
      });

      socket.on('disconnect', () => {
        io.to(room).emit('message', `${username} has left the chat`);
      });
    });
  });
};
