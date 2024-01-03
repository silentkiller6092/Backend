import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshaccessToken,
  registerUser,
} from "../controllers/User.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
const router = Router();
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// Secured routes and this is middleware verifiyJWT and next is used to run next one
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshaccessToken);
export default router;
