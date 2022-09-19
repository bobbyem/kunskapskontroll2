const jwt = require("jsonwebtoken");
const userDB = require("../config/userDB");

const protect = async (req, res, next) => {
  let token;

  if (req.cookies.accessToken) {
    try {
      //Try to decode the token
      const userID = jwt.verify(
        req.cookies.accessToken,
        process.env.TOKEN_SECRET
      );

      //Add User-id to req
      req.body.userID = userID;

      //Move on
      next();
    } catch (error) {
      console.log(error);
    }
  }
  if (!token) {
    res.status(401);
  }
};

module.exports = protect;
