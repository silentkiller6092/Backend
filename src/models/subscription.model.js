import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema(
  {
    // one who is subscring
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // whome to subscribe
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export const Subscription = mongoose.model("Subscription", subscriptionSchema);
