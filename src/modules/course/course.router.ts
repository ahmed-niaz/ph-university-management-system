import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';
import { userRole } from '../user/user.constant';
import auth from '../../middlewares/auth';

const courseRouter = express.Router();

courseRouter.post(
  '/create-course',
  auth(userRole.admin),
  validateRequest(courseValidation.createCourseValidationSchema),
  courseController.createCourse,
);

courseRouter.get('/', courseController.getCourses);
courseRouter.get('/:courseId', courseController.singleCourse);

courseRouter.patch(
  '/:courseId',
  auth(userRole.admin),
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseController.updateCourse,
);

courseRouter.delete(
  '/:courseId',
  auth(userRole.admin),
  courseController.deleteCourse,
);

courseRouter.put(
  '/:courseId/assign-faculties',
  validateRequest(courseValidation.assignMultipleFacultiesValidationSchema),
  courseController.assignCourseFaculties,
);

courseRouter.delete(
  '/:courseId/remove-faculties',
  validateRequest(courseValidation.assignMultipleFacultiesValidationSchema),
  courseController.removeCourseFaculties,
);

export default courseRouter;
