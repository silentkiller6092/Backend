import { Router } from "express";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controllers/subscription.controller.js";
const router = new Router();
router
  .route("/toggleSubscription/:channelId")
  .post(verifyJWT, toggleSubscription);
router
  .route("/getSubscriber/:channelId")
  .post(verifyJWT, getUserChannelSubscribers);
router
  .route("/getSubscription/:subscriberId")
  .post(verifyJWT, getSubscribedChannels);
export default router;
