const Joi = require("joi");

module.exports = Joi.object().keys({
  name: Joi.string()
    .required()
    .error(() => {
      return { message: "Company name is required!" };
    }),
  location: Joi.string()
    .required()
    .error(() => {
      return { message: "Company location is required!" };
    }),
});
