import Joi from 'joi';

export const messageValidation = Joi.object({
  message: Joi.string().required().max(255).trim().strict()
});
