import { ApiError } from "../utils/ApiErrors.js";
import { asynHandler } from "../utils/asyncHandler.js";
import { User } from "../models/Users.model.js";
import { uploadOnCloudnary } from "../utils/Cloduniary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asynHandler(async (req, res) => {
  //  get user Deatils from frontend
  // validation - not empty
  // same email address : check with username and email
  // Check for image, check for avatr
  // Upload for cloudnary , Check avatar is available or not
  // create user object - create entry in db
  // remove the password and refreshtoken from response
  // weather response came or not or user created or nor
  // return response
  // else error

  // Getting user details

  const { fullName, username, email, password } = req.body;
  if (
    [fullName, username, email, password].some((filed) => filed?.trim() === "")
  ) {
    throw new ApiError(400, "All fields must be provided");
  }
  //  Have to add email and other validation
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) throw new ApiError(409, "User already exists");

  // Handling the images req.files ahve info about file using multer
  // let avatarLocalPath=''
  const avatarLocalPath = req.files?.avatar?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // The rest of your code for processing the avatarLocalPath

  let coverImageLocalPath = "";
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  const avatar = await uploadOnCloudnary(avatarLocalPath);

  const coverImage = await uploadOnCloudnary(coverImageLocalPath);
  if (!avatar) throw new ApiError(400, "Avatar file is required");
  const userCreation = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    username: username.toLowerCase(),
    password,
  });
  const createdUser = await User.findById(userCreation._id).select(
    "-password -refreshToken"
  );
  if (!createdUser)
    throw new ApiError(500, "Something went wrong while Registering the user");
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "Successfully registered"));
});
export { registerUser };
