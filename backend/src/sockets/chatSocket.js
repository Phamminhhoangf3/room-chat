import { Server } from 'socket.io';
import { addUser, getUser, getUsersInRoom, removeUser } from '../utils/users.js';

const IO_PORT = process.env.APP_PORT_IO;

export const sio = server => {
  return new Server(server, {
    transports: ['polling'],
    cors: {
      origin: `http://localhost:${IO_PORT}`
    }
  });
};

export const connection = io => {
  io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room, avatar }) => {
      const { user } = addUser({ id: socket.id, name: username, room, avatar });
      if (!user) return;
      socket.join(room);
      socket.to(room).emit('message', {
        sender: user.name,
        message: `${user.name} đã vào phong chat!`,
        avatar: user.avatar
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    });

    socket.on('chatMessage', mgs => {
      const user = getUser(socket.id);
      io.to(user.room).emit('message', { sender: user.name, message: mgs, avatar: user.avatar });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    });

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.room).emit('message', {
          sender: user.name,
          message: `${user.name} đã rời phòng chat!`,
          avatar: user.avatar
        });
        io.to(user.room).emit('roomData', {
          room: user.room,
          users: getUsersInRoom(user.room)
        });
      }
    });
  });
};
