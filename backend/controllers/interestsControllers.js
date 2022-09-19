const interestsDB = require("../config/interestsDB");

//POST
//Dest "/add"
const addInterest = async (req, res) => {
  const { userID, data } = req.body;
  if (!userID || !data) {
    res.send("Missing UserId or Data");
    return;
  }
  //Try to find user
  const user = await interestsDB.findOne({ userID });
  //If no match - create new document
  if (!user) {
    interestsDB.insert({ userID, interests: data });
    res.send("Interests added").status(200);
    return;
  }
};

//GET
//Dest "/"
const getInterests = async (req, res) => {
  const { userID } = req.body;

  console.log(userID);

  //If no id send error
  if (!userID) {
    res.send({ title: "Error", prompt: "UserId not found" });
    return;
  }

  //Try to find user
  const user = await interestsDB.findOne({ userID });

  console.log(user);

  //If no match - create new document
  if (!user) {
    res.status(200).json({ title: "Error", prompt: "No matching user" });
    return;
  }
  //Send data
  res.status(200).send(user.interests);
};

module.exports = { addInterest, getInterests };
