import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semesterRegistrationService } from './semesterReg.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const payload = req.body;
  const result =
    await semesterRegistrationService.createSemesterRegistration(payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'created course successfully',
    data: result,
  });
});

const getSemesterRegistrations = catchAsync(async (req, res) => {
  const result = await semesterRegistrationService.getSemesterRegistrations(
    req.query,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' The semester registration is being retrieved successfully. 🚀',
    data: result,
  });
});

const singleSemesterRegistration = catchAsync(async (req, res) => {
  const registrationId = req.params.registrationId;
  const result =
    await semesterRegistrationService.singleSemesterRegistration(
      registrationId,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Semester registration is being retrieved successfully. 🚀',
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const registrationId = req.params.registrationId;
  const payload = req.body;
  const result = await semesterRegistrationService.updateSemesterRegistration(
    registrationId,
    payload,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Semester registration is being updated successfully. 🚀',
    data: result,
  });
});

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getSemesterRegistrations,
  singleSemesterRegistration,
  updateSemesterRegistration,
};
