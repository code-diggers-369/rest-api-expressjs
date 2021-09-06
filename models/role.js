const mongoose = require("mongoose");
const validator = require("validator");

const roleSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
      required: true,
      auto: true,
    },
    title: {
      type: String,
      required: true,
    },
    departmentId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "role",
  }
);

const Role = new mongoose.model("role", roleSchema);

module.exports = Role;
