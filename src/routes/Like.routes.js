import { Router } from "express";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
import {
  getLikedVideos,
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
} from "../controllers/like.controller.js";
const router = new Router();

router.route("/tweetLike/:tweetId").post(verifyJWT, toggleTweetLike);
router.route("/commentLike/:commentId").post(verifyJWT, toggleCommentLike);
router.route("/videoLike/:videoId").post(verifyJWT, toggleVideoLike);
router.route("/getallLiked").get(verifyJWT, getLikedVideos);
export default router;
