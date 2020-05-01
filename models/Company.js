const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required!"],
    },
    location: {
      type: String,
      required: [true, "Company location is required!"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Company = mongoose.model("company", CompanySchema);
