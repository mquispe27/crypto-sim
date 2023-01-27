const mongoose = require("mongoose");

const LeagueSchema = new mongoose.Schema({
  name: String,
  code: String,
  creator: String,
  users: [String]

});

// compile model from schema
module.exports = mongoose.model("league", LeagueSchema);
