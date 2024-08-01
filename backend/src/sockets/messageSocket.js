/* eslint-disable no-console */
import { Server } from 'socket.io';

export const sio = server => {
  return new Server(server, {
    transports: ['polling'],
    cors: {
      origin: '*'
    }
  });
};

export const connection = io => {
  io.on('connection', socket => {
    socket.on('chat message', msg => {
      io.emit('chat message', msg);
    });
  });
};
