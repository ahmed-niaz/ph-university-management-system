import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicDeptService } from './academicDept.service';

const createAcademicDept = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await academicDeptService.createAcademicDept(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'created academic department successfully',
    data: result,
  });
});

const getAcademicDept = catchAsync(async (req, res) => {
  const result = await academicDeptService.getAcademicDept();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'all academic department retrieved successfully',
    data: result,
  });
});

const singleAcademicDept = catchAsync(async (req, res) => {
  const academicDept = req.params.academicDept;
  const result = await academicDeptService.singleAcademicDept(academicDept);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'academic department retrieved successfully',
    data: result,
  });
});

const updatedAcademicDept = catchAsync(async (req, res) => {
  const payload = req.body;
  const academicDept = req.params.academicDept;
  const result = await academicDeptService.updatedAcademicDept(
    academicDept,
    payload,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'academic department updated successfully',
    data: result,
  });
});

export const academicDeptController = {
  createAcademicDept,
  getAcademicDept,
  singleAcademicDept,
  updatedAcademicDept,
};
