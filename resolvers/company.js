const { UserInputError } = require("apollo-server-express");
const mongoose = require("mongoose");
const Joi = require("joi");

const { Company } = require("../models");
const { validateCompanyInput } = require("../validation");

module.exports = {
  Query: {
    companies: (root, args, context, info) => {
      console.log("asd");
      return Company.find({});
    },
    company: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError("The user id is not valid!");
      }
      return Company.findById(id);
    },
  },
  Mutation: {
    addCompany: async (root, args, context, info) => {
      await Joi.validate(args, validateCompanyInput, { abortEarly: false });
      return Company.create(args);
    },
  },
};
