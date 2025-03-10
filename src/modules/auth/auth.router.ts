import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { authController } from './auth.controller';
import { userRole } from '../user/user.constant';
import auth from '../../middlewares/auth';
const authenticationRouter = express.Router();

authenticationRouter.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  authController.userLogin,
);

authenticationRouter.post(
  '/change-password',
  auth(userRole.faculty, userRole.student, userRole.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  authController.changePassword,
);

authenticationRouter.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshValidationSchema),
  authController.refreshToken,
);

export default authenticationRouter;
