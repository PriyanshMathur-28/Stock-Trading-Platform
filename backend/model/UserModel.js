// models/UserModel.js
const { model } = require("mongoose");
const { UserSchema } = require("../schemas/UserSchema");

const UserModel = model("user", UserSchema); // ✅ Removed 'new'

module.exports = { UserModel };