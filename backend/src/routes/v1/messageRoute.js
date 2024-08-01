import express from 'express';
import { messageController } from '../../controllers/messageController.js';
import { messageValidation } from '../../validations/messageValidation.js';

const Router = express.Router();

Router.route('/').post(messageValidation.createNew, messageController.createNew);

export const messageRoute = Router;
