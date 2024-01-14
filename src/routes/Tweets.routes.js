import { Router } from "express";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
import {
  createTweet,
  deleteTweet,
  getUserTweets,
  updateTweet,
} from "../controllers/Tweets.controller.js";
const router = new Router();
router.route("/addTweet").post(verifyJWT, createTweet);
router.route("/deleteTweet/:commentId").delete(verifyJWT, deleteTweet);
router.route("/updateTweet/:commentId").patch(verifyJWT, updateTweet);
router.route("/getUserTweets").get(verifyJWT, getUserTweets);
export default router;
