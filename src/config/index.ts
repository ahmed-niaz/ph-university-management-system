import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
  jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRES_IN,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  cloud_name: process.env.CLOUD_NAME,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
};
