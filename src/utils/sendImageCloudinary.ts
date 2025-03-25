import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs/promises';

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret, // Click 'View API Keys' above to copy your API secret
});

/*
export const sendImageToCloudinary = async (imageName: string,path:string) => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret, // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      path,
      {
        public_id: imageName,
      },
    )
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);
};
*/

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    });

    console.log('Image uploaded successfully:', result.secure_url);

    // Delete local file after successful upload
    await fs.unlink(path); // ✅ Using fs.promises.unlink() correctly
    console.log('File deleted successfully from local storage.');

    return result;
  } catch (error) {
    console.error('Error:', error);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
