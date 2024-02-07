const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: [50, "Title cannot be more than 50 characters"],
    },

    brand: {
      type: String,
      required: true,
      maxlength: [20, "Brand name cannot be more than 20 characters"],
    },

    description: {
      type: String,
      maxlength: [200, "Description cannot be more than 200 characters"],
    },

    price: {
      type: Number,
      required: true,
    },

    gallery: {
      type: [String],
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Tech", "Clothing", "Cars"],
    },

    colors: {
      type: [String],
      required: true,
    },

    size: {
      type: [String],
      enum: ["S", "M", "XL", "128GB", "256GB", "512GB", "1TB"],
    },

    inventory: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = new mongoose.model("Product", ProductSchema);
