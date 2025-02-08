import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  console.log("create std data >> [controllers] >>",{password,studentData});
  const result = await userService.createStudent(password, studentData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user created successfully',
    data: result,
  });
});



// create faculty
const createFaculty = catchAsync(async(req,res) => {
  const {password,faculty: facultyData} = req.body;

  const result = await userService.createFaculty(password,facultyData)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'faculty created successfully',
    data: result,
  });

})

export const userController = {
  createStudent,
  createFaculty,
};
