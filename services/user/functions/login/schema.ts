import Joi from "joi";

export const Schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});