import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await userService.createStudent(password, studentData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user created successfully',
    data: result,
  });
});

export const userController = {
  createStudent,
};
