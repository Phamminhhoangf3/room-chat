import Joi from 'joi';
import { GET_DB } from '../config/mongodb.js';

const MESSAGE_COLLECTION_NAME = 'message';
const MESSAGE_COLLECTION_SCHEMA = Joi.object({
  message: Joi.string().required().max(255).trim().strict()
});

const validationBeforeCreate = async data => {
  return await MESSAGE_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

const createNew = async data => {
  try {
    const validData = await validationBeforeCreate(data);
    const createdRole = await GET_DB().collection(MESSAGE_COLLECTION_NAME).insertOne(validData);
    return createdRole;
  } catch (error) {
    throw new Error(error);
  }
};

export const messageModel = {
  createNew
};
