const userDB = require("../config/userDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//POST
//Dest "/signup"
const addUser = async (req, res) => {
  //Store credentials
  const { username, email, password } = req.body;

  //Check credentials
  if (!username || !email || !password) {
    console.log(req.body);
    res.json("Missing Params");
    return;
  }

  //Check if the username is taken
  const usernameTaken = await userDB.findOne({ username });
  const emailTaken = await userDB.findOne({ email });
  if (usernameTaken || emailTaken) {
    res.json("Username and or Email taken");
    return;
  }

  //Add user to db
  userDB.insert({
    username,
    email,
    password: await bcrypt.hash(password, 10),
    cookie: "",
  });
  //Respond with success
  res.status(200).json("User added");
};

//POST
//Dest "/login"
const loginUser = async (req, res) => {
  //Store credentials
  const { email, password } = req.body;

  //Check credentials
  if (!email || !password) {
    res.send("Missing Params");
    return;
  }

  //Try to find user
  const user = await userDB.findOne({ email });

  //If no match - respond
  if (!user) {
    res.status(200).send("User not found");
  }

  //If passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    //Create cookie
    const cookie = Math.floor(Math.random() * 10000);
    //Set Cookie in userelement
    userDB.update({ email }, { $set: { cookie } }, {});
    res.cookie("loggedIn", cookie).json("Login success");
    return;
  }

  //No password match
  res.json("Password incorrect");
};

module.exports = { addUser, loginUser };
