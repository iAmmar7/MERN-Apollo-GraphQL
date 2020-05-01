const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = Joi.object().keys({
  carId: Joi.string(),
  name: Joi.string()
    .required()
    .error(() => {
      return { message: "Car name is required!" };
    }),
  make: Joi.string()
    .min(4)
    .max(4)
    .required()
    .error(() => {
      return { message: "Car make year length must be 4!" };
    }),
  company: Joi.string()
    .required()
    .error(() => {
      return { message: "Company name is required!" };
    }),
});
