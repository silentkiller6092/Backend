import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String, //Cloudinary url for Avatar file
      required: true,
    },
    coverImage: {
      type: String, //Cloudinary url for CoverImage file
    },
    watchHistory: [
      {
        type: Schema.types.ObjectID,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hash(this.password, 10);
    next();
  } else {
    return next();
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  // this.password is decrypted password which is getting frm db
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCES_TOEKN_EXPIRY,
    }
  );
};
userSchema.methods.generaterefreshTokenToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOEKN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOEKN_EXPIRY,
    }
  );
};
export const User = mongoose.model("User", userSchema);
