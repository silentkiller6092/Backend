import mongoose from "mongoose";
import { Video } from "../models/Video.model.js";
import { Comment } from "../models/comments.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynHandler } from "../utils/asyncHandler.js";
const getVideoComments = asynHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const allComments = await Comment.aggregate([
      {
        $match: {
          video: new mongoose.Types.ObjectId(videoId), // When matching the raw Video id to video id in Database
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: parseInt(limit, 10),
      },
    ]);
    return res
      .status(200)
      .json(new ApiResponse(200, { allComments }, "Success"));
  } catch (e) {
    throw new ApiError(400, e.message);
  }
});

const addComment = asynHandler(async (req, res) => {
  // TODO: add a comment to a video
  try {
    const { content } = req.body;

    const userid = req.user._id;
    const { videoId } = req.params;
    if (!content) throw new ApiError(404, "Comment Required");
    const addComments = Comment.create({
      content: content,
      owner: userid,
      video: videoId,
    });
    if (!addComments) throw new ApiError(500, "Something went wrong");
    return res
      .status(200)
      .json(new ApiResponse(200, { addComments }, "Success"));
  } catch (e) {
    throw new ApiError(400, e.message || "Not able to add a comment");
  }
});

const updateComment = asynHandler(async (req, res) => {
  try {
    // TODO: update a comment
    const { videoId } = req.params;
    const userid = req.user._id;

    const { content } = req.body;
    console.log(content);
    const UserCommentId = await Video.findById(videoId);
    if (userid.toString() === UserCommentId.owner.toString()) {
      const updateComment = await Comment.updateOne(
        { video: videoId },
        { $set: { content: content } }
      );

      return res
        .status(200)
        .json(new ApiResponse(200, { updateComment }, "success"));
    } else {
      throw new ApiError(401, "Only Author can edit his own comments");
    }
  } catch (e) {
    throw new ApiError(401, e.message);
  }
});

const deleteComment = asynHandler(async (req, res) => {
  // TODO: delete a comment
  try {
    // TODO: update a comment
    const { commentId } = req.params;
    const userid = req.user._id;

    const updateComment = await Comment.deleteOne({
      _id: commentId,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, { updateComment }, "success"));
  } catch (e) {
    throw new ApiError(401, e.message);
  }
});

export { getVideoComments, addComment, updateComment, deleteComment };
