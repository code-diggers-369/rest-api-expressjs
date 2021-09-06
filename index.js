const express = require("express");
require("dotenv/config");

// import database Connnection
require("./config/databaseConnection")();

//
const app = express();
const port = process.env.PORT || 3030;

// app.use is callled
//

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routes
const useRoute = require("./routes/User");

// use routes
app.use("/api/user", useRoute);

//
app.listen(port, () => console.log(`server is running on ${port}`));
