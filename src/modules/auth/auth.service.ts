import config from '../../config';
import AppErr from '../../errors/AppError';
import { User } from '../user/user.model';
import { TUserLogin } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import { emailSender } from '../../utils/emailSender';

const userLogin = async (payload: TUserLogin) => {
  // checking if the user is exists
  // const doesUserExists = await User.findOne({ id: payload?.id }); // [cut]
  // console.log({ doesUserExists });

  const user = await User.doesUserExistsByCustomId(payload?.id);

  // console.log(user);

  if (!user) {
    throw new AppErr(400, 'user does not exist 🤒');
  }

  /*
  // check if the user is already deleted
  const isDeleted = doesUserExists?.isDeleted;
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppErr(400, 'user is deleted');
  }
*/

  if (await User.isDeletedCustomStaticMethod(payload.id)) {
    throw new AppErr(400, 'user is deleted 😵');
  }

  // check if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppErr(400, 'user is blocked');
  }

  // // check if the password is correct
  // const doesPasswordMatched = await bcrypt.compare(payload?.password,doesUserExists?.password)

  // console.log(doesPasswordMatched);
  if (!(await User.doesPasswordMatched(payload?.password, user?.password))) {
    throw new AppErr(400, 'password does not matched');
  }

  //access granted : send access token, refresh token [create token and send to the client]

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expire_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expire_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userInfo: JwtPayload,
  payload: { newPassword: string; oldPassword: string },
) => {
  // console.log({ 'user control auth data': userInfo });
  // console.log({ payload });

  // check if the user exists
  const user = await User.doesUserExistsByCustomId(userInfo?.userId);

  if (!user) {
    throw new AppErr(400, 'user does not exist 🤒');
  }

  if (await User.isDeletedCustomStaticMethod(user.id)) {
    throw new AppErr(400, 'user is deleted 😵');
  }

  // // check if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppErr(400, 'user is blocked');
  }

  // compare old and new password
  if (!(await User.doesPasswordMatched(payload.oldPassword, user?.password))) {
    throw new AppErr(400, 'password does not matched');
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await User.findOneAndUpdate(
    {
      id: userInfo.userId,
      role: userInfo.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  console.log({ result });
  return null;
};

const refreshToken = async (token: string) => {
  // need to verify the refresh token
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_token as string,
  ) as JwtPayload;

  // after verify the refresh token get the value
  const { userId, iat } = decoded;

  // check if the user is exist
  const user = await User.doesUserExistsByCustomId(userId);

  if (!user) {
    throw new AppErr(400, 'user does not exist 🤒');
  }

  // checking if the user is deleted

  if (await User.isDeletedCustomStaticMethod(userId)) {
    throw new AppErr(400, 'user is deleted 😵');
  }

  // check if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppErr(400, 'user is blocked');
  }
  if (
    user.passwordChangedAt &&
    User.hasJWTExpiredAfterPasswordChange(user.passwordChangedAt, iat as number)
  ) {
    throw new AppErr(401, 'Access denied: you are not authorized 🚫');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expire_in as string,
  );

  return { accessToken };
};

const forgetPassword = async (userId: string) => {
  // checking if the user is exists
  const user = await User.doesUserExistsByCustomId(userId);
  if (!user) {
    throw new AppErr(400, 'user does not exist 🤒');
  }
  // checking if the user is deleted
  if (await User.isDeletedCustomStaticMethod(userId)) {
    throw new AppErr(400, 'user is deleted 😵');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppErr(400, 'This user is blocked ! !');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    '10m',
    // config.jwt_access_expire_in as string,
  );

  const uiResetLink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken}`;

  emailSender(user.email, uiResetLink);
  console.log(uiResetLink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const userId = payload?.id;
  // checking if the user is exists
  const user = await User.doesUserExistsByCustomId(userId);
  if (!user) {
    throw new AppErr(400, 'user does not exist 🤒');
  }
  // checking if the user is deleted
  if (await User.isDeletedCustomStaticMethod(userId)) {
    throw new AppErr(400, 'user is deleted 😵');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppErr(400, 'This user is blocked ! !');
  }

  // verify access token
  const decoded = jwt.verify(
    token,
    config.jwt_access_token as string,
  ) as JwtPayload;

  console.log(decoded);

  if (userId !== decoded.userId) {
    throw new AppErr(400, 'user is forbidden');
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
};

export const authService = {
  userLogin,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
