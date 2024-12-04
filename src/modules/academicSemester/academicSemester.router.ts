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

academicSemesterRouter.get(
  '/:semesterId',
  academicSemesterController.singleAcademicSemester,
);
academicSemesterRouter.patch(
  '/:semesterId',
  validateRequest(
    academicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterController.updateAcademicSemester,
);

academicSemesterRouter.get('/', academicSemesterController.getAcademicSemester);

export default academicSemesterRouter;
