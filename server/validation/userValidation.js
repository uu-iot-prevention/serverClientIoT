const Joi = require("joi");

const updateSchema = Joi.object({
  username: Joi.string().messages({
    "string.base": `"username" should be a type of 'text'`,
    "string.empty": `"username" cannot be an empty field`,
    "any.required": `"username" is a required field`,
  }),
  surname: Joi.string().messages({
    "string.base": `"surname" should be a type of 'text'`,
    "string.empty": `"surname" cannot be an empty field`,
    "any.required": `"surname" is a required field`,
  }),
  email: Joi.string().messages({
    "string.base": `"email" should be a type of 'text'`,
    "string.empty": `"email" cannot be an empty field`,
    "any.required": `"email" is a required field`,
  }),
  password: Joi.string().min(4).max(10).messages({
    "string.empty": `"password" cannot be an empty field`,
    "any.required": `"password" is a required field`,
    "string.min": `"password" should have a minimum length of {4}`,
    "string.max": `"password" should have a maximal length of {10}`,
  }),
  roles: Joi.array().items(Joi.string().valid("USER", "ADMIN")),
});

// const registrationValiation = Joi.validate(registrationSchema, schema);

module.exports = { updateSchema };
