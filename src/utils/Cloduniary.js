import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

const uploadOnCloudnary = async (localfilepath) => {
  try {
    if (!localfilepath) return "File not found on server";
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });

    // File has been uploaded successfully
    fs.unlinkSync(localfilepath);
    return response;
  } catch (error) {
    fs.unlinkSync(localfilepath);
  }
};
export { uploadOnCloudnary };
