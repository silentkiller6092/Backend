import { Likes } from "../models/Likes.models.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asynHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user.id.toString();
  try {
    const condition = { LikedBy: userId, video: videoId };
    const comment = await Likes.findOne(condition);
    if (!comment) {
      const createLike = await Likes.create(condition);
      return res
        .status(200)
        .json(new ApiResponse(200, { createLike }, "Success"));
    } else {
      const removeLike = await Likes.findOneAndDelete(condition);
      return res
        .status(200)
        .json(new ApiResponse(200, { removeLike }, "Success"));
    }
  } catch (e) {
    throw new ApiError(400, e.message || "Something went wrong");
  }
});

const toggleCommentLike = asynHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.id.toString();
  try {
    const condition = { LikedBy: userId, comment: commentId };
    const comment = await Likes.findOne(condition);
    if (!comment) {
      const createLike = await Likes.create(condition);
      return res
        .status(200)
        .json(new ApiResponse(200, { createLike }, "Success"));
    } else {
      const removeLike = await Likes.findOneAndDelete(condition);
      return res
        .status(200)
        .json(new ApiResponse(200, { removeLike }, "Success"));
    }
  } catch (e) {
    throw new ApiError(400, e.message || "Something went wrong");
  }
});

const toggleTweetLike = asynHandler(async (req, res) => {
  const { tweetId } = req.params;
  const userId = req.user._id;
  const tweetidstr = userId.toString();
  try {
    const condition = { LikedBy: tweetidstr, tweet: tweetId };
    const like = await Likes.findOne(condition);
    if (!like) {
      const createLike = await Likes.create(condition);
      return res
        .status(200)
        .json(
          new ApiResponse(200, { createLike }, "LikedBy Successfully Created")
        );
    } else {
      const removeLike = await Likes.findOneAndDelete(condition);
      return res
        .status(200)
        .json(new ApiResponse(200, { removeLike }, "Successfully Deleted"));
    }
  } catch (e) {
    throw new ApiError(400, e.message);
  }
});

const getLikedVideos = asynHandler(async (req, res) => {
  //TODO: get all liked videos
  const userId = req.user._id.toString();
  try {
    const allLiked = await Likes.find({
      LikedBy: userId,
      video: { $exists: true },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, { allLiked }, "Successfully"));
  } catch (e) {
    throw new ApiError(400, e.message);
  }
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
