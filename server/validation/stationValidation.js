const Joi = require("joi");

const stationSchemaRegistrate = Joi.object({
  idStation: Joi.string().required().messages({
    "string.base": `"idStation" should be a type of 'text'`,
    "string.empty": `"idStation" cannot be an empty field`,
    "any.required": `"idStation" is a required field`,
  }),
  stationName: Joi.string().required().messages({
    "string.base": `"stationName" should be a type of 'text'`,
    "string.empty": `"stationName" cannot be an empty field`,
    "any.required": `"stationName" is a required field`,
  }),
  roles: Joi.array().items(Joi.string().valid("STATION").required()),

  dataTemperature: Joi.array().items(
    Joi.object({
      time: Joi.date().required().messages({
        "date.base": `"time" should be a type of 'date'`,
        "any.required": `"time" is a required field`,
      }),

      value: Joi.string().required().messages({
        "string.base": `"value" should be a type of 'text'`,
        "string.empty": `"value" cannot be an empty field`,
        "any.required": `"value" is a required field`,
      }),
    })
  ),
  stationAlert: Joi.array().items(
    Joi.object({
      time: Joi.date()
        .messages({
          "date.base": `"time" should be a type of 'date'`,
          "any.required": `"time" is a required field`,
        })
        .required(),
      message: Joi.string()
        .messages({
          "string.base": `"message" should be a type of 'text'`,
          "string.empty": `"message" cannot be an empty field`,
          "any.required": `"message" is a required field`,
        })
        .required(),
      type: Joi.array().items(Joi.string().valid("SOS", "FIRE").required()),
    })
  ),
});
const stationSchemaLogin = Joi.object({
  idStation: Joi.string().required().messages({
    "string.base": `"idStation" should be a type of 'text'`,
    "string.empty": `"idStation" cannot be an empty field`,
    "any.required": `"idStation" is a required field`,
  }),
  roles: Joi.array().items(Joi.string().valid("STATION").required()),
});

module.exports = { stationSchemaRegistrate, stationSchemaLogin };
