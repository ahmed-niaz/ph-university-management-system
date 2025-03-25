import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

// create student
const createStudent = catchAsync(async (req, res) => {

  // console.log(req.file);
  // console.log((req.body));

  const { password, student: studentData } = req.body;
  // console.log('create std data >> [controllers] >>', { password, studentData });
  const result = await userService.createStudent(req.file,password, studentData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user created successfully',
    data: result,
  });
});

// create faculty
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userService.createFaculty(password, facultyData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'faculty created successfully',
    data: result,
  });
});

// create admin
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userService.createAdmin(password, adminData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'admin created successfully',
    data: result,
  });
});

// getMe
const getMe = catchAsync(async (req, res) => {
  // verify the token
  // const token = req.headers.authorization;

  // if(!token) {
  //   throw new AppErr(400, 'token not found😶‍🌫️')
  // }

  const { userId, role } = req.user;
  const result = await userService.getMe(userId, role);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user is retrieved successfully 🙀',
    data: result,
  });
});

// change status
const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await userService.changeStatus(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user is retrieved successfully 🙀',
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
