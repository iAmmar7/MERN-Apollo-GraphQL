const { UserInputError } = require("apollo-server-express");
const mongoose = require("mongoose");
const Joi = require("joi");

const { Company } = require("../models");
const { validateCompanyInput } = require("../validation");

module.exports = {
  Query: {
    companies: (root, args, context, info) => {
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

      await Company.findOne({ name: new RegExp("^" + args.name + "$", "i") }).then((res) => {
        if (res) {
          throw new UserInputError("The company already exist!");
        }
      });
      return Company.create(args);
    },
  },
};
