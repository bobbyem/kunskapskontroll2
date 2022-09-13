const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const accounts = require("./routes/userRoutes");
const interests = require("./routes/interestsRoutes");
const cookieParser = require("cookie-parser");

//App variables
const app = express();
const PORT = 5000;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
//Routes
app.use("/accounts", accounts);
app.use("/interests", interests);

//Create UNIX socket
app.listen(PORT, () => {
  console.log(colors.america(`Server running on port: ${PORT}`));
});
