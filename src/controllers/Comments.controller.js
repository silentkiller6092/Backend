import { Video } from "../models/Video.model.js";
import { Comment } from "../models/comments.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynHandler } from "../utils/asyncHandler.js";

const getVideoComments = asynHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
});

const addComment = asynHandler(async (req, res) => {
  // TODO: add a comment to a video
  try {
    const { content } = req.body;
    if (!content) throw new ApiError(404, "Comment Required");
    const addComments = Comment.create({
      content: content,
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
  // TODO: update a comment
  const { videoId } = req.params;
  const userid = req.user._id;
  const UserCommentId = await Video.findById(videoId);
  if (userid === UserCommentId.owner.toString()) {
  }
});

const deleteComment = asynHandler(async (req, res) => {
  // TODO: delete a comment
});

export { getVideoComments, addComment, updateComment, deleteComment };
