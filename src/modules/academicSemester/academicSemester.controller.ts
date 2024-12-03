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

export const academicSemesterController = {
  createAcademicSemester,
};
