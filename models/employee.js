const mongoose = require("mongoose");
const validator = require("validator");

const employeeSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
      required: true,
      auto: true,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 3,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
    },
    roleId: {
      type: String,
      required: true,
    },
    managerId: {
      type: String,
      required: true,
    },
    // email: {
    //   type: String,
    //   required: true,
    //   unique: [true, "Email Id Already Present"],
    //   validate(value) {
    //     if (!validator.default.isEmail(value)) {
    //       throw new Error("Invalid Email");
    //     }
    //   },
    // },
    // phone: {
    //   type: Number,
    //   min: 10,
    //   max: 10,
    //   required: true,
    //   unique: true,
    // },
    // address: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
    collection: "employee",
  }
);

const Employee = new mongoose.model("employee", employeeSchema);

module.exports = Employee;
