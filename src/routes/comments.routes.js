import { Router } from "express";
import { updateComment } from "../controllers/Comments.controller.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
const router = new Router();
router.route("/videoId/:videoId").post(verifyJWT, updateComment);
export default router;
