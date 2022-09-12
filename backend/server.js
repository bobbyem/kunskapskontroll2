const express = require("express");
const colors = require("colors");
const app = express();
const interestsDB = require("./config/interestsDB");
const accounts = require("./routes/userRoutes");
const interests = require("./routes/interestsRoutes");

//App variables
const PORT = 5000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routes
app.use("/accounts", accounts);
app.use("/interests", interests);

//Create UNIX socket
app.listen(PORT, () => {
  console.log(colors.america(`Server running on port: ${PORT}`));
});
