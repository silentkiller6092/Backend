import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asynHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user._id;
  try {
    const conditions = { subscriber: userId, channel: channelId };
    const subscribed = await Subscription.findOne(conditions);
    if (!subscribed) {
      const createSubscription = await Subscription.create(conditions);
      return res
        .status(200)
        .json(new ApiResponse(200, { createSubscription }, "subscribed"));
    } else {
      const deleteSubscription = await Subscription.findOneAndDelete(
        conditions
      );
      return res
        .status(200)
        .json(new ApiResponse(200, { deleteSubscription }, "subscribed"));
    }
  } catch (e) {
    throw new ApiError(400, e.message);
  }
  // TODO: toggle subscription
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asynHandler(async (req, res) => {
  try {
    const { channelId } = req.params;
    const subscribber = await Subscription.find({ channel: channelId });
    return res
      .status(200)
      .json(new ApiResponse(200, { subscribber }, "Success"));
  } catch (e) {
    throw new ApiError(400, e.message);
  }
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asynHandler(async (req, res) => {
  const { subscriberId } = req.params;
  try {
    const subscribber = await Subscription.find({ subscriber: subscriberId });
    return res
      .status(200)
      .json(new ApiResponse(200, { subscribber }, "Success"));
  } catch (e) {
    throw new ApiError(400, e.message);
  }
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
