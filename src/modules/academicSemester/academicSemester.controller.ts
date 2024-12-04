import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterService.createAcademicSemester(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'academic semester is created successfully',
    data: result,
  });
});

const getAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterService.getAcademicSemester();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'retrieved academic semester successfully',
    data: result,
  });
});

const singleAcademicSemester = catchAsync(async (req, res) => {
  const semesterId = req.params.semesterId;
  const result =
    await academicSemesterService.singleAcademicSemester(semesterId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'retrieved academic semester successfully',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const semesterId = req.params.semesterId;
  const payload = req.body;
  const result = await academicSemesterService.updateAcademicSemester(
    semesterId,
    payload,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'retrieved academic semester successfully',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAcademicSemester,
  singleAcademicSemester,
  updateAcademicSemester,
};
