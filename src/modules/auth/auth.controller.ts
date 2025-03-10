import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';

const userLogin = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await authService.userLogin(payload);

  // set the refresh token into the cookie
  const { refreshToken, accessToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user logged in successfully 🙀',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  // console.log('request body form the auth changed password', req.body);
  // const user = req.user;
  // console.log({ 'To control data': req.user });

  const result = await authService.changePassword(req.user, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully 🎉',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'access token is retrieved successfully 🙀',
    data: result,
  });
});

export const authController = {
  userLogin,
  changePassword,
  refreshToken,
};
