import express from 'express';
import { SemesterRegistrationValidation } from './semesterReg.validation';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationControllers } from './semesterReg.controller';
const semesterRegistrationRouter = express.Router();

semesterRegistrationRouter.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

semesterRegistrationRouter.get(
  '/',
  semesterRegistrationControllers.getSemesterRegistrations,
);

semesterRegistrationRouter.get(
  '/:registrationId',
  semesterRegistrationControllers.singleSemesterRegistration,
);
semesterRegistrationRouter.patch(
  '/:registrationId',
  validateRequest(
    SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

export default semesterRegistrationRouter;
