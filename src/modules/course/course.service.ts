import QueryBuilder from '../../builder/queryBuilder';
import { courseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourse = async (payload: TCourse) => {
  console.log(payload);
  const result = await Course.create(payload);
  return result;
};

// get all courses
const getCourses = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourse = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;
  console.log(payload);

  // update basic course info [step-1]
  const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
    },
  );

  console.log({ updateBasicCourseInfo });

  console.log(preRequisiteCourses);

  // Check if there are any prerequisite courses to update
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // Filter out the deleted prerequisite courses
    const deletedPreRequisites = preRequisiteCourses
      .filter((value) => value?.course && value.isDeleted)
      .map((value) => value.course);

    console.log(deletedPreRequisites);

    // remove the course[delete the course]
    const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } },
    });

    console.log({ deletedPreRequisitesCourses });

    // filter out the new course fields
    const preRequisites = preRequisiteCourses?.filter(
      (element) => element.course && !element.isDeleted,
    );
    console.log(preRequisites);

    const newPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisites: { $each: preRequisites } },
    });

    console.log({ newPreRequisiteCourses });
  }

  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );

  return result;
};

// delete course
const deleteCourse = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true }, // Soft delete by setting isDeleted to true
    { new: true }, // Return updated document
  );
  return result;
};

export const courseService = {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
