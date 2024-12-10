import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await academicFacultyService.createAcademicFaculty(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'created academic faculty successfully',
    data: result,
  });
});

const getAcademicFaculties = catchAsync(async (req, res) => {
  const result = await academicFacultyService.getAcademicFaculties();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved academic faculties successfully',
    data: result,
  });
});

const singleAcademicFaculty = catchAsync(async (req, res) => {
  const facultyId = req.params.facultyId;
  const result = await academicFacultyService.singleAcademicFaculty(facultyId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved academic faculty successfully',
    data: result,
  });
});

const updatedAcademicFaculty = catchAsync(async (req, res) => {
  const payload = req.body;
  const facultyId = req.params.facultyId;
  const result = await academicFacultyService.updatedAcademicFaculty(
    facultyId,
    payload,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'updated academic faculty successfully',
    data: result,
  });
});

export const academicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculties,
  singleAcademicFaculty,
  updatedAcademicFaculty,
};
