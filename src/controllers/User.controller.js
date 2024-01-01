import { ApiError } from "../utils/ApiErrors.js";
import { asynHandler } from "../utils/asyncHandler.js";
import { User } from "../models/Users.model.js";
import { uploadOnCloudnary } from "../utils/Cloduniary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessTokenAndrefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToekn = user.generateAccessToken();
    const refreshToken = user.generaterefreshTokenToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToekn, refreshToken };
  } catch (e) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};
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

// Login User

const loginUser = asynHandler(async (req, res) => {
  // Take Username or email and pass
  // take data from req.body
  // find the user
  // if no then user not defined
  // password check
  // incorrect password
  // access and refresh token
  // save the token in cookie
  // logged in successfully
  const { username, email, password } = req.body;
  if (!username || !email)
    throw new ApiError(400, "Email or Username is required");
  const user = User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) throw new ApiError(404, "User not found");
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Incorrect user credentials");
  const { accessToekn, refreshToken } =
    await generateAccessTokenAndrefreshToken(user._id);
  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToekn, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      200,
      { user: loggedinUser, accessToekn, refreshToken },
      "User Logged in successfully"
    );
});

// Logout
const logoutUser = asynHandler(async (req, res) => {
  try {
  } catch (e) {
    throw new Error(500, "Logout");
  }
});
export { registerUser, loginUser };
