import mongoose from "mongoose";
import dotenv from 'dotenv';
import __dirname from "../utils.js";
dotenv.config();

export default {
  connectDB: async() => {
    try {
      const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      const url = `${db.connection.host}:${db.connection.port}`;
      console.log(`MongoDB conected on ${url}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  },
  path: __dirname + "/files/"
}