import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoModel = new Schema(
  {
    videoFile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // We will take thsi from cloudinary
      required: true,
    },
    views: {
      type: Number, // We will take
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

videoModel.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video", videoModel);
