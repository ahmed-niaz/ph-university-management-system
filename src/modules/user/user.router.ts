import { Router } from 'express';
import { userController } from './user.controller';
// import validateRequest from '../../middlewares/validateRequest';
// import { studentValidations } from '../student/student.validation';

const userRouter = Router();

userRouter.post(
  '/create-student',
  //   validateRequest(studentValidations.studentValidationSchema),
  userController.createStudent,
);

export default userRouter;

// user -> then student
