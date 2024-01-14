import { Video } from "../models/Video.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteFile, uploadOnCloudnary } from "../utils/Cloduniary.js";
import { asynHandler } from "../utils/asyncHandler.js";
const videoUpload = asynHandler(async (req, res) => {
  try {
    const { title, description } = req.body;
    const userid = req.user._id;
    const videoFileLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailFileLocalPath = req.files?.thumbnail?.[0]?.path;
    if (!videoFileLocalPath) throw new ApiError(400, "Video file required");
    if (!thumbnailFileLocalPath)
      throw new ApiError(400, "Thumbnail file required");
    const uploadVideoOnCloudinary = await uploadOnCloudnary(videoFileLocalPath);
    const uploadThubnailCloudinary = await uploadOnCloudnary(
      thumbnailFileLocalPath
    );
    if (!(uploadThubnailCloudinary || uploadVideoOnCloudinary))
      throw new ApiError(400, "Upload video error");
    const videoPublish = await Video.create({
      videoFile: uploadVideoOnCloudinary.url,
      thumbnail: uploadThubnailCloudinary.url,
      title,
      description,
      duration: uploadVideoOnCloudinary.duration,
      cloudinaryVideoID: uploadVideoOnCloudinary.public_id, //Adding these details to delete the video from the cloudinary also
      cloudinaryThumbnailID: uploadThubnailCloudinary.public_id,
      owner: userid,
    });
    if (!videoPublish)
      throw ApiError(500, "Something went wrong while uploading");
    return res
      .status(200)
      .json(new ApiResponse(200, { videoPublish }, "Success"));
  } catch (e) {
    throw new ApiError(400, e.message);
  }
});

const getAllVideos = asynHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  const sortOptions = {};
  if (sortBy) {
    sortOptions[sortBy] = sortType == "desc" ? -1 : 1;
  }
  try {
    const result = await Video.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
          owner: userId,
        },
      },
      {
        $sort: sortOptions,
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: parseInt(limit),
      },
    ]);
    return res.status(200).json(new ApiResponse(200, { result }, "Success"));
  } catch (e) {
    throw new ApiError(500, e.message);
  }
});
const getVideoById = asynHandler(async (req, res) => {
  try {
    const { videoId } = req.params;
    const videoUrl = await Video.findById(videoId).select(
      "-thumbnail -title -description "
    );
    if (!videoUrl) throw new ApiError(404, "Video not found");

    return res
      .status(200)
      .json(new ApiResponse(200, { videoUrl }, "Success file "));
  } catch (e) {
    throw new ApiError(404, e.message);
  }
});
const updateVideo = asynHandler(async (req, res) => {
  try {
    const { videoId } = req.params;
    const localFilePathofVideo = req.file.path;

    if (!localFilePathofVideo) {
      throw new ApiError(404, "File not found");
    }

    const uploadCloud = await uploadOnCloudnary(localFilePathofVideo);

    if (!uploadCloud.url) {
      throw new ApiError(500, "Unable to upload to cloud");
    }
    const public_id_video = await Video.findById(videoId);
    const deleteFileServer = await deleteFile(
      public_id_video.cloudinaryVideoID
    );

    console.log("Filed  file deleted", deleteFileServer);
    const uploadfileonServer = await Video.findByIdAndUpdate(
      videoId,
      {
        $set: {
          videoFile: uploadCloud.url,
          cloudinaryVideoID: uploadCloud.public_id,
        },
      },
      { new: true }
    );
    if (!uploadfileonServer)
      throw new ApiError(500, "Unable to update video on server");
    return res
      .status(200)
      .json(new ApiResponse(200, { uploadfileonServer }, "Success"));
    // Assuming deleteFile is a function you've defined elsewhere
  } catch (e) {
    throw new ApiError(500, "Error uploading: " + e.message);
  }
});
const deleteVideo = asynHandler(async (req, res) => {
  try {
    const { videoId } = req.params;
    const public_id_video = await Video.findById(videoId);

    if (!public_id_video) {
      throw new ApiError(404, "Video not found");
    }

    const cloudinaryVideoID = public_id_video.cloudinaryVideoID;

    const deleteFileServer = await deleteFile(cloudinaryVideoID);

    if (!deleteFileServer.result || deleteFileServer.result !== "ok") {
      throw new ApiError(500, "Unable to delete file on Cloudinary");
    }

    const uploadfileonServer = await Video.findByIdAndDelete(videoId);

    if (!uploadfileonServer) {
      throw new ApiError(500, "Unable to delete video on server");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { uploadfileonServer }, "Success"));
  } catch (e) {
    throw new ApiError(500, "Error deleting: " + e.message);
  }
});

const togglePublishStatus = asynHandler(async (req, res) => {
  try {
    const { videoId } = req.params;
    const toggel = await Video.findOneAndUpdate({ _id: videoId }, [
      { $set: { isPublished: { $not: "$isPublished" } } },
    ]);
    return res.status(200).json(new ApiResponse(200, { toggel }, "Updated"));
  } catch (e) {
    throw new ApiError(400, e.message || "Unable to update video");
  }
});
export {
  videoUpload,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
  getAllVideos,
};
