import connectDB from "./db/index.js";
import dotnev from "dotenv";
dotnev.config({
  path: "./env",
});
connectDB();
