import { messageModel } from '../models/messageModel.js';

const createNew = async reqBody => {
  try {
    const newMessage = { ...reqBody };
    return await messageModel.createNew(newMessage);
  } catch (error) {
    throw error;
  }
};

export const messageService = { createNew };
