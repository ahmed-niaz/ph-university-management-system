import { NextFunction, Request, Response, Router } from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import { userRole } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { upload } from '../../utils/sendImageCloudinary';
import { studentValidations } from '../student/student.validation';

const userRouter = Router();

userRouter.post(
  '/create-student',
  auth(userRole.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.studentValidationSchema),
  userController.createStudent,
);

userRouter.post('/create-faculty', userController.createFaculty);

userRouter.post('/create-admin', userController.createAdmin);

userRouter.get(
  '/me',
  auth(userRole.admin, userRole.faculty, userRole.student),
  userController.getMe,
);

userRouter.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(UserValidation.changeValidationSchema),
  userController.changeStatus,
);

export default userRouter;

// user -> then student
