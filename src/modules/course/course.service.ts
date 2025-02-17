import mongoose from 'mongoose';
import QueryBuilder from '../../builder/queryBuilder';
import { courseSearchableFields } from './course.constant';
import { TAssignCourseFaculty, TCourse } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppErr from '../../errors/AppError';

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

// update course
/*
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
*/

// update course with transaction
const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;
  console.log(payload);
  // start transaction
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // update basic course info [step-1]
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    console.log({ updateBasicCourseInfo });
    if (!updateBasicCourseInfo) {
      throw new AppErr(404, 'failed to update course');
    }

    console.log(preRequisiteCourses);

    // Check if there are any prerequisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // Filter out the deleted prerequisite courses
      const deletedPreRequisites = preRequisiteCourses
        .filter((value) => value?.course && value.isDeleted)
        .map((value) => value.course);

      console.log(deletedPreRequisites);

      // remove the course[delete the course]
      const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      console.log({ deletedPreRequisitesCourses });

      if (!deletedPreRequisitesCourses) {
        throw new AppErr(404, 'failed to delete course');
      }

      // filter out the new course fields
      const preRequisites = preRequisiteCourses?.filter(
        (element) => element.course && !element.isDeleted,
      );
      console.log(preRequisites);

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisites: { $each: preRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      console.log({ newPreRequisiteCourses });
      if (!newPreRequisiteCourses) {
        throw new AppErr(
          404,
          'Failed to retrieve the new prerequisite course.',
        );
      }

      const result = await Course.findById(id).populate(
        'preRequisiteCourses.course',
      );

      return result;
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppErr(404, 'Failed to retrieve the new prerequisite course.');
  }
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

// assign multiple faculties
const assignCourseFaculties = async (
  id: string,
  payload: Partial<TAssignCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );

  return result;
};

// remove faculties
const removeCourseFaculties = async (
  id: string,
  payload: Partial<TAssignCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: {
        faculties: { $in: payload },
      },
    },
    {
      new: true,
    },
  );
  return result;
};

export const courseService = {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignCourseFaculties,
  removeCourseFaculties,
};
