import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentService } from './student.service';
import sendResponse from '../../utils/sendResponse';

const getStudent: RequestHandler = async (req, res, next) => {
  try {
    const result = await studentService.getStudent();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const singleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.studentId;
    const result = await studentService.singleStudent(studentId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateStudent: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body;
    const studentId = req.params.studentId;
    const result = await studentService.updateStudent(studentId, payload);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

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
  updateStudent,
  deleteStudent,
};
