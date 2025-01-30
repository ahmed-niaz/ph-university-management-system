import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicDeptValidation } from './academicDept.validation';
import { academicDeptController } from './academicDept.controller';

const academicDeptRouter = express.Router();

academicDeptRouter.post(
  '/create-academic-dept',
  validateRequest(academicDeptValidation.createAcademicDeptValidationSchema),
  academicDeptController.createAcademicDept,
);

academicDeptRouter.get(
  '/:academicDept',
  academicDeptController.singleAcademicDept,
);

academicDeptRouter.get('/',academicDeptController.getAcademicDept)

academicDeptRouter.patch(
  '/:academicDept',
  validateRequest(academicDeptValidation.updateAcademicDeptValidationSchema),
  academicDeptController.updatedAcademicDept,
);

export default academicDeptRouter;
