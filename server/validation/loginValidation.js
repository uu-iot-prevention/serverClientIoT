const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.base": `"email" should be a type of 'text'`,
    "string.empty": `"email" cannot be an empty field`,
    "any.required": `"email" is a required field`,
  }),
  password: Joi.string().required().min(4).max(10).messages({
    "string.empty": `"password" cannot be an empty field`,
    "any.required": `"password" is a required field`,
  }),
});

module.exports = loginSchema;
