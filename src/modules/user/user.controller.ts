import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await userService.createStudent(password, studentData);

    res.status(200).send({
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
