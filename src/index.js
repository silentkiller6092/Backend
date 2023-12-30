import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotnev from "dotenv";
dotnev.config({
  path: "./env",
});
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server is running at port " + process.env.PORT);
    });
  })
  .catch((e) => {
    console.log("DB connection error", e.message);
  });
