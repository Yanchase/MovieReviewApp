import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Async function to connect to the database
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("db connected");
  } catch (exp) {
    console.error("throw error: ", exp);
  }
}

// Call the function to make the connection
connectDB();
