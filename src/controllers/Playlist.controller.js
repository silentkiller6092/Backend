import mongoose from "mongoose";
import { PlayList } from "../models/Playlist.models.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynHandler } from "../utils/asyncHandler.js";

const createPlaylist = asynHandler(async (req, res) => {
  const { name, description } = req.body;
  const { videoId } = req.params;
  const userId = req.user._id;
  try {
    if (!name) throw new ApiError(404, "Name is Required filed");
    const createPlaylist = await PlayList.create({
      name,
      description,
      videos: videoId,
      owner: userId,
    });
    if (!createPlaylist) throw new ApiError(500, "Unable to create playlist");
    return res
      .status(200)
      .json(new ApiResponse(200, { createPlaylist }, "Success"));
  } catch (e) {
    throw new ApiError(400, e.message || "Unable to add Playlist");
  }
});

const getUserPlaylists = asynHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists
  try {
    const allPlaylists = await PlayList.find({
      owner: new mongoose.Types.ObjectId(userId),
    });
    if (!allPlaylists) throw new ApiError(401, "No Playlists found");
    return res
      .status(200)
      .json(new ApiResponse(200, { allPlaylists }, "Success"));
  } catch (e) {
    throw new ApiError(400, e.message || "Unable to find Playlist");
  }
});

const getPlaylistById = asynHandler(async (req, res) => {
  const { playlistId } = req.params;
  try {
    const allPlaylistsbyid = await PlayList.find({
      _id: new mongoose.Types.ObjectId(playlistId),
    });
    if (!allPlaylistsbyid) throw new ApiError(401, "No Playlists found");
    return res
      .status(200)
      .json(new ApiResponse(200, { allPlaylistsbyid }, "Success"));
  } catch (e) {
    throw new ApiError(400, e.message || "Unable to find Playlist");
  }
});

const addVideoToPlaylist = asynHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  try {
    const addtoPlaylist = await PlayList.updateOne(
      { _id: new mongoose.Types.ObjectId(playlistId) },
      { $push: { videos: videoId } }
    );
    if (!addtoPlaylist) throw new ApiError(500, "Unable to update playlist");
    return res
      .status(200)
      .json(new ApiResponse(200, { addtoPlaylist }, "Success"));
  } catch (e) {
    throw new ApiError(400, e.message || "Unable to find Playlist");
  }
});

const removeVideoFromPlaylist = asynHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  try {
    const removeVideoFromPlaylistRequest = await PlayList.updateOne(
      {
        _id: new mongoose.Types.ObjectId(playlistId),
      },
      { $pull: { videos: new mongoose.Types.ObjectId(videoId) } }
    );
    if (!removeVideoFromPlaylistRequest)
      throw new ApiError(500, "Unable to update playlist");
    return res
      .status(200)
      .json(
        new ApiResponse(200, { removeVideoFromPlaylistRequest }, "Success")
      );
  } catch (e) {
    throw new ApiError(400, e.message || "Unable to find Playlist");
  }
});

const deletePlaylist = asynHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist
  try {
    const deletePlaylistRequest = await PlayList.findByIdAndDelete(
      new mongoose.Types.ObjectId(playlistId)
    );
    if (!deletePlaylistRequest)
      throw new ApiError(500, "Unbale to deleted playlist");
    return res
      .status(200)
      .json(new ApiResponse(200, { deletePlaylistRequest }, "Success"));
  } catch (e) {
    throw new ApiError(400, e.message || "Unable to delete playlist");
  }
});

const updatePlaylist = asynHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist
  try {
    if (!name) throw new ApiError(404, "Name is required");
    const updatePlaylist = await PlayList.updateOne(
      {
        _id: new mongoose.Types.ObjectId(playlistId),
      },
      { $set: { name: name, description: description } }
    );
    if (!updatePlaylist) throw new ApiError(500, "some error occurred");
    return res
      .status(200)
      .json(new ApiResponse(200, { updatePlaylist }, "success"));
  } catch (e) {
    throw new ApiError(400, e.message || "Unable to find Playlist");
  }
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
