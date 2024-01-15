import { ApiResponse } from "../utils/ApiResponse.js";
import { asynHandler } from "../utils/asyncHandler.js";

const healthcheck = asynHandler(async (req, res) => {
  //TODO: build a healthcheck response that simply returns the OK status as json with a message
  return res.status(200).json(new ApiResponse(200, {}, "OK"));
});

export { healthcheck };
