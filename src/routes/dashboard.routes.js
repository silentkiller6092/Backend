import { Router } from "express";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
import {
  getChannelStats,
  getChannelVideos,
} from "../controllers/dashBoard.controller.js";
const router = new Router();
router.route("/getdashboard/:userId").get(verifyJWT, getChannelStats);
router.route("/getVideos/:userId").get(verifyJWT, getChannelVideos);
export default router;
