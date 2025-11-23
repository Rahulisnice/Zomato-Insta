import dotenv from "dotenv";
dotenv.config();
import pkg from "@imagekit/nodejs";
const ImageKit = pkg.default || pkg;

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const uploadFile = async (file, fileName) => {
  try {
    const result = await imagekit.files.upload({
      file: file.toString("base64"),
      fileName: fileName,
    });
    return result;
  } catch (error) {
    res
      .status(500)
      .json({ message: "File upload error", error: error.message });
  }
};
