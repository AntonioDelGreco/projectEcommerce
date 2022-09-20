import mongoose from "mongoose";

const collection = 'Products';
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  timestamp: String,
  thumbnail: String,
})
export { collection, productSchema };