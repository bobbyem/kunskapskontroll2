const nedb = require("nedb-promises");
const db = new nedb({ filename: "interestsDB.db", autoload: true });

module.exports = db;
