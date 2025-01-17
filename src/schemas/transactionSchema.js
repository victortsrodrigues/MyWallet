import joi from "joi";

export const transactionSchema = joi.object({
  value: joi.number().positive().required(),
  description: joi.string().required(),
  type: joi.valid('deposit', 'withdraw').required()
});