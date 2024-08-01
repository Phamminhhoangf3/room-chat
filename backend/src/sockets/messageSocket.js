import { Server } from 'socket.io';
import { messageValidation } from '../validations/messageValidation.js';
import { messageModel } from '../models/messageModel.js';

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
    socket.on('chat message', async msg => {
      try {
        const { error, value } = messageValidation.validate({ message: msg });
        if (!error) {
          const res = await messageModel.createNew(value.message);
          console.log('🚀 ~ connection ~ res:', res);
        }
      } catch (error) {
        socket.emit('chat message error', 'Failed to insert message into database');
      }
      // io.emit('chat message', msg);
    });
  });
};
