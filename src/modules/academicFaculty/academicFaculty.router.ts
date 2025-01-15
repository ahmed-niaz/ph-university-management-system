import express from 'express';
import { academicFacultyValidation } from './academicFaculty.validation';
import { academicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';

const academicFacultyRouter = express.Router();

academicFacultyRouter.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  academicFacultyController.createAcademicFaculty,
);
academicFacultyRouter.get(
  '/:facultyId',
  academicFacultyController.singleAcademicFaculty,
);
academicFacultyRouter.patch(
  '/:facultyId',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyController.updatedAcademicFaculty,
);
academicFacultyRouter.get('/', academicFacultyController.getAcademicFaculties);

export default academicFacultyRouter;
