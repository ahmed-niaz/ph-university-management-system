import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { offeredCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await offeredCourseService.createOfferedCourse(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'created offeredCourse successfully 🙀',
    data: result,
  });
});

const getOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseService.getOfferedCourse();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offeredCourse retrieved successfully 🙀',
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;
  const payload = req.body;

  const result = await offeredCourseService.updateOfferedCourse(
    courseId,
    payload,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'updated offeredCourse successfully 🙀',
    data: result,
  });
});

export const offeredCourseController = {
  createOfferedCourse,
  getOfferedCourse,
  updateOfferedCourse,
};
