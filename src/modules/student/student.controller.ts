import { NextFunction, Request, Response } from 'express';
import { studentService } from './student.service';

const singleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.studentId;
    const result = await studentService.singleStudent(studentId);
    res.send({
      success: true,
      message: 'Tour retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const studentController = {
  singleStudent,
};
