import joi from "joi";

export const userSingUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required()
});

export const userSingInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});