import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Import Rutes
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentrouter from "./routes/comments.routes.js";
import tweetrouter from "./routes/Tweets.routes.js";
import likerouter from "./routes/Like.routes.js";
import subsrouter from "./routes/subscription.routes.js";
import playlistrouter from "./routes/Playlist.routes.js";
// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/comment", commentrouter);
app.use("/api/v1/tweet", tweetrouter);
app.use("/api/v1/like", likerouter);
app.use("/api/v1/subscription", subsrouter);
app.use("/api/v1/playlist", playlistrouter);
// http://localhost:8000/api/v1/users/register
export { app };
