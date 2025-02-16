import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { courseService } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await courseService.createCourse(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'created course successfully',
    data: result,
  });
});

// get all courses
const getCourses = catchAsync(async (req, res) => {
  const result = await courseService.getCourses(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' The course is being retrieved successfully. 🚀',
    data: result,
  });
});

// get single course
const singleCourse = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;
  const result = await courseService.getSingleCourse(courseId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' The course is being retrieved successfully. 🚀',
    data: result,
  });
});

// updated course
const updateCourse = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;
  const payload = req.body;

  const result = await courseService.updateCourse(courseId, payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' The course is being updated successfully. 👋',
    data: result,
  });
});

// delete course
const deleteCourse = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;
  const result = await courseService.deleteCourse(courseId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' The course is being deleted successfully. 🚀',
    data: result,
  });
});

// assign  multiple faculties
const assignCourseFaculties = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;
  const payload = req.body;
  const result = await courseService.assignCourseFaculties(courseId, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' assign  multiple faculties added successfully. 👋',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getCourses,
  singleCourse,
  deleteCourse,
  updateCourse,
  assignCourseFaculties,
};
