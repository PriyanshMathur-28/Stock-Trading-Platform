// models/OrdersModel.js
const { model } = require("mongoose");
const { OrdersSchema } = require("../schemas/OrdersSchema");

const OrdersModel = model("order", OrdersSchema); // ✅ Removed 'new'

module.exports = { OrdersModel };