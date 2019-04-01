const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserData = new Schema({
  queries: [String],
  username: String,
  password: String
});

const UserSchema = mongoose.model("userlist", UserData);

module.exports = UserSchema;
