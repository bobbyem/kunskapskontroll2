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

module.exports = { addInterest };
