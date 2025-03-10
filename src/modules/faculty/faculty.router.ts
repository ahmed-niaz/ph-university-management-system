import { Router } from 'express';
import { facultiesController } from './faculty.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';

const facultyRouter = Router();

facultyRouter.get(
  '/',
  auth(userRole.admin, userRole.faculty),
  facultiesController.getFaculties,
);

export default facultyRouter;
