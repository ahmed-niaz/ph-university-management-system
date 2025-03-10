import { Router } from 'express';
import { studentController } from './student.controller';
import { userRole } from '../user/user.constant';
import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
// import { updateStudentValidationSchema } from './student.validation';

const studentRouter = Router();
studentRouter.get('/:studentId', studentController.singleStudent);
// studentRouter.patch('/:studentId',
//     validateRequest(updateStudentValidationSchema),
//      studentController.updateStudent);
studentRouter.delete('/:studentId', studentController.deleteStudent);
studentRouter.get(
  '/',
  auth(userRole.admin, userRole.student),
  studentController.getStudent,
);

export default studentRouter;
