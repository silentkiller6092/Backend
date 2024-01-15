import { Router } from "express";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getUserPlaylists,
  removeVideoFromPlaylist,
  updatePlaylist,
} from "../controllers/Playlist.controller.js";
const router = new Router();
router.route("/createPlaylist/:videoId").post(verifyJWT, createPlaylist);
router.route("/getuserplaylist/:userId").get(verifyJWT, getUserPlaylists);
router.route("/getPlaylistId/:playlistId").get(verifyJWT, getPlaylistById);
router
  .route("/addVideoPlaylist/:playlistId/:videoId")
  .post(verifyJWT, addVideoToPlaylist);
router
  .route("/removeVideo/:playlistId/:videoId")
  .delete(verifyJWT, removeVideoFromPlaylist);
router.route("/deletePlaylist/:playlistId").delete(verifyJWT, deletePlaylist);
router.route("/updatePlaylist/:playlistId").patch(verifyJWT, updatePlaylist);
export default router;
