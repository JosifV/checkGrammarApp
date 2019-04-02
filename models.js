const mongoose = require("mongoose");
const { Schema } = mongoose;

// Database schema of every user
const UserData = new Schema({
  queries: [String],
  username: String,
  password: String
});

const UserSchema = mongoose.model("userlist", UserData);

module.exports = UserSchema;
