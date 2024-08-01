import { StatusCodes } from 'http-status-codes';
import { messageService } from '../services/messageService.js';

const createNew = async (req, res, next) => {
  try {
    const createMessage = await messageService.createNew(req.body);
    res.status(StatusCodes.CREATED).json(createMessage);
  } catch (error) {
    next(error);
  }
};

export const messageController = {
  createNew
};
