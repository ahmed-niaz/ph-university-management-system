import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { facultiesService } from './faculty.service';

const getFaculties = catchAsync(async (req, res) => {
  console.log(req.cookies);
  const result = await facultiesService.getFaculties(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' The faculty is being retrieved successfully. 🚀',
    data: result,
  });
});

export const facultiesController = {
  getFaculties,
};
