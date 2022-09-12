const userDB = require("../config/userDB");
const bcrypt = require("bcrypt");

//POST
//Dest "/signup"
const addUser = async (req, res) => {
  //Store credentials
  const { username, email, password } = req.body;

  //Check credentials
  if (!username || !email || !password) {
    res.send("Missing Params");
    return;
  }

  //Check if the username is taken
  const usernameTaken = await userDB.findOne({ username: username });
  const emailTaken = await userDB.findOne({ email: email });
  if (usernameTaken || emailTaken) {
    res.send("Username and or Email taken");
    return;
  }

  //Add user to db
  userDB.insert({ username, email, password: await bcrypt.hash(password, 10) });
  //Respond with success
  res.status(200).send(`User: ${username} with Email: ${email} added`);
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
    res.send("Login Success");
    return;
  }

  //No password match
  res.send("Password incorrect");
};

module.exports = { addUser, loginUser };
