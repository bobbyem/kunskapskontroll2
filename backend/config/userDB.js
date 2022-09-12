const nedb = require("nedb-promises");
const db = new nedb({ filename: "userDB.db", autoload: true });

module.exports = db;
