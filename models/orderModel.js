const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderItems: {
      type: Array,
      required: true,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
