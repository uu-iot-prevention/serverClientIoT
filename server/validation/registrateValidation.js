const Joi = require("joi");

const registrationSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.base": `"username" should be a type of 'text'`,
    "string.empty": `"username" cannot be an empty field`,
    "any.required": `"username" is a required field`,
  }),
  surname: Joi.string().required().messages({
    "string.base": `"surname" should be a type of 'text'`,
    "string.empty": `"surname" cannot be an empty field`,
    "any.required": `"surname" is a required field`,
  }),
  email: Joi.string().required().messages({
    "string.base": `"email" should be a type of 'text'`,
    "string.empty": `"email" cannot be an empty field`,
    "any.required": `"email" is a required field`,
  }),
  password: Joi.string().required().min(4).max(10).messages({
    "string.empty": `"password" cannot be an empty field`,
    "any.required": `"password" is a required field`,
    "string.min": `"password" should have a minimum length of {4}`,
    "string.max": `"password" should have a maximal length of {10}`,
  }),
});

// const registrationValiation = Joi.validate(registrationSchema, schema);

module.exports = registrationSchema;
