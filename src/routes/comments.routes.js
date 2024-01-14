import { Router } from "express";
import {
  addComment,
  deleteComment,
  getVideoComments,
  updateComment,
} from "../controllers/Comments.controller.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";

const router = new Router();
router.route("/updateComment/:videoId").post(verifyJWT, updateComment);
router.route("/addComment/:videoId").post(verifyJWT, addComment);
router.route("/deleteComment/:commentId").delete(verifyJWT, deleteComment);
router.route("/getAllComments/:videoId").get(verifyJWT, getVideoComments);
export default router;
