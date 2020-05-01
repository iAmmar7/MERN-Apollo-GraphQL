const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Car name is required!"],
    },
    make: {
      type: String,
      required: [true, "Car make is required!"],
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "company",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Car = mongoose.model("car", CarSchema);
