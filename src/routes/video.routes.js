import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  togglePublishStatus,
  updateVideo,
  videoUpload,
} from "../controllers/Video.controller.js";
const router = Router();
router.route("/uploadVideo").post(
  verifyJWT,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  videoUpload
);
router.route("/videoId/:videoId").get(getVideoById);
router
  .route("/videoId/:videoId")
  .patch(upload.single("videoFile"), updateVideo);
router.route("/videoId/:videoId").delete(deleteVideo);
router.route("/videoId/:videoId").post(togglePublishStatus);
router.route("/getAllVideo").get(getAllVideos);
export default router;
