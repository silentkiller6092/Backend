import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

// All the configuration being done here
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "16kb",
  })
);
// to handle the urlencoded
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
// space for external files to store
app.use(express.static("public"));
//  this configuration used to securly read the user cookies via server
app.use(cookieParser());
export { app };
