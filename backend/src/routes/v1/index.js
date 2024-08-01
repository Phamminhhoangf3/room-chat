import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { messageRoute } from './messageRoute.js';

const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' });
});

Router.use('/sendMessage', messageRoute);

export const APIs_V1 = Router;
