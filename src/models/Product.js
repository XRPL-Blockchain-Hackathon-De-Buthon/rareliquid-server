// src/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  rwaToken: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, trim: true },
  category: { type: String, trim: true },
  owner: { type: String, required: true, trim: true },
  public_endpoint: {
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
