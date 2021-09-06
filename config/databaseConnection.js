const mongoose = require("mongoose");

function database() {
  // for not put auto s in collection name like employee to employees
  mongoose.pluralize(null);
  //
  mongoose.connect(process.env.MONGO_CONNECTION_URL, (err) => {
    if (err) throw err;

    console.log("Database Connected");
  });
}

module.exports = database;
