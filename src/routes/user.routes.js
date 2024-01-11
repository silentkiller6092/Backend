import { Router } from "express";
import {
  changeCurrentPassword,
  coverImageUpdate,
  getUserChanelProfile,
  getcurrentUser,
  loginUser,
  logoutUser,
  refreshaccessToken,
  registerUser,
  updateUserDetails,
  updateuserAvatr,
  watchHistory,
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
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getcurrentUser);
router.route("/update-account").patch(verifyJWT, updateUserDetails);
router
  .route("/avatar-update")
  .patch(verifyJWT, upload.single("avatar"), updateuserAvatr);
router
  .route("/update-cover")
  .patch(verifyJWT, upload.single("cover"), coverImageUpdate);
router.route("/channel/:username").get(verifyJWT, getUserChanelProfile); //getting data from params
router.route("/hostory").get(verifyJWT, watchHistory);
export default router;
