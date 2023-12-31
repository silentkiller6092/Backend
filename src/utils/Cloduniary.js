import { v2 as cloudinary } from "cloudnary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudnary = async (localfilepath) => {
  try {
    if (!localfilepath) return "File not found on server";
    const fileUploadSession = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });

    // File has been uploaded successfully
    console.log(
      "File uploaded successfully on cloudinary",
      fileUploadSession.url
    );
    return fileUploadSession;
  } catch (error) {
    fs.unlink(localfilepath); // remove the localy saved file as the upload for failed
    return null;
  }
};
export { uploadOnCloudnary };
