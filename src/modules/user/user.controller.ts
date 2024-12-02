import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await userService.createStudent(password, studentData);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'user created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createStudent,
};
