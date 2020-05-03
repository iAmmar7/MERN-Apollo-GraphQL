const { UserInputError } = require("apollo-server-express");
const mongoose = require("mongoose");
const Joi = require("joi");

const { Car, Company } = require("../models");
const { validateCarInput } = require("../validation");

module.exports = {
  Query: {
    cars: async (root, args, context, info) => {
      // return Car.find({}).limit(args.limit).skip(args.skip).populate("company");
      return await Car.find({}).populate("company");
    },
    car: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError("The user id is not valid!");
      }

      return Car.findById(id).populate("company");
    },
    paginatedCars: async (root, { limit, page }, context, info) => {
      let totalCars = await Car.countDocuments({});
      const offset = (page - 1) * limit;
      let carsData = await Car.find({}).limit(limit).skip(offset).populate("company");

      let result = {
        cars: carsData,
        totalCars: totalCars,
        perPage: limit,
        currentPage: page,
        totalPages: Math.ceil(totalCars / limit),
      };
      return result;
    },
  },
  Mutation: {
    addCar: async (root, args, context, info) => {
      await Joi.validate(args, validateCarInput, { abortEarly: false });

      const validId = await Company.findById(args.company);

      if (validId === null) {
        throw new UserInputError("The company id is not valid!");
      }

      return Car.create(args);
    },

    updateCar: async (root, args, context, info) => {
      await Joi.validate(args, validateCarInput, { abortEarly: false });
      const validId = await Car.findById(args.carId);

      if (validId === null) {
        throw new UserInputError("The car id is not valid!");
      }

      return Car.findOneAndUpdate({ _id: args.carId }, args);
    },

    deleteCar: async (root, args, context, info) => {
      const validId = await Car.findById(args.carId);

      if (validId === null) {
        throw new UserInputError("The car id is not valid!");
      }
      return Car.findOneAndDelete({ _id: args.carId });
    },
  },
  // Car: {
  //   company: async (car, args, context, info) => {
  //     await car.populate("company").execPoopulate();

  //     return car.company;
  //   },
  // },
};
