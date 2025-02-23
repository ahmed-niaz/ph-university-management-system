import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { offeredCourseController } from './offeredCourse.controller';

const offeredCourseRouter = express.Router();

offeredCourseRouter.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  offeredCourseController.createOfferedCourse,
);

offeredCourseRouter.get('/', offeredCourseController.getOfferedCourse);

offeredCourseRouter.patch(
  '/:courseId',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  offeredCourseController.updateOfferedCourse,
);

export default offeredCourseRouter;
