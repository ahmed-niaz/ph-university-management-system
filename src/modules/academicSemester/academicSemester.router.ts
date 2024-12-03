import { Router } from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';

const academicSemesterRouter = Router();

academicSemesterRouter.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidation.academicSemesterValidationSchema),
  academicSemesterController.createAcademicSemester,
);

export default academicSemesterRouter;
