import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';

const courseRouter = express.Router();

courseRouter.post(
  '/create-course',
  validateRequest(courseValidation.createCourseValidationSchema),
  courseController.createCourse,
);

courseRouter.get('/', courseController.getCourses);
courseRouter.get('/:courseId', courseController.singleCourse);

courseRouter.patch(
  '/:courseId',
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseController.updateCourse,
);

courseRouter.delete('/:courseId', courseController.deleteCourse);

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
