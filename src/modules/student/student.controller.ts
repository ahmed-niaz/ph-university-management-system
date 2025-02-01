import { RequestHandler } from 'express';
import { studentService } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getStudent = catchAsync(async (req, res) => {
  console.log(req.query);
  const result = await studentService.getStudent(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  });
});

const singleStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await studentService.singleStudent(studentId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  });
});

// const updateStudent = catchAsync(async (req, res) => {
//   const payload = req.body;
//   const studentId = req.params.studentId;
//   const result = await studentService.updateStudent(studentId, payload);

//   console.log(result);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Student updated successfully',
//     data: result,
//   });
// });

const deleteStudent: RequestHandler = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const result = await studentService.deleteStudent(studentId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const studentController = {
  getStudent,
  singleStudent,
  // updateStudent,
  deleteStudent,
};
