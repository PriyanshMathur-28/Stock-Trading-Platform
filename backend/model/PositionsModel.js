// models/PositionsModel.js
const { model } = require("mongoose");
const { PositionsSchema } = require("../schemas/PositionsSchema");

const PositionsModel = model("position", PositionsSchema); // ✅ Removed 'new'

module.exports = { PositionsModel };