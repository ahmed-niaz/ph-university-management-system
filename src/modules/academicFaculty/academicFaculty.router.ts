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

export default academicFacultyRouter