import mongoose from "mongoose";
export const Likes = new mongoose.Schema(
  {},

  { timestamps: true }
);
export default LikesMOdel = new mongoose.model("Likes", Likes);
