import AppErr from '../../errors/AppError';
import { AcademicDept } from '../academicDept/academicDept.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterReg.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';

// create offered course
const createOfferedCourse = async (payload: TOfferedCourse) => {
  // from the payload
  const {
    semesterRegistration,
    academicFaculty,
    academicDept,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;
  // step-1 [check if the semester registration id does exists]
  const doesSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!doesSemesterRegistrationExists) {
    throw new AppErr(400, 'semester registration not found 😒');
  }

  const academicSemester = doesSemesterRegistrationExists.academicSemester;

  // step-2[academic faculty]
  const doesAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!doesAcademicFacultyExists) {
    throw new AppErr(400, 'academic faculty not found 😒');
  }

  // step-3 [academic Dept]
  const doesAcademicDeptExists = await AcademicDept.findById(academicDept);

  if (!doesAcademicDeptExists) {
    throw new AppErr(400, 'academic Dept not found 😒');
  }

  // step- 4
  const doesCourseExists = await Course.findById(course);
  if (!doesCourseExists) {
    throw new AppErr(400, 'course not found 😒');
  }
  // step- 5
  const doesFacultyExists = await Faculty.findById(faculty);
  if (!doesFacultyExists) {
    throw new AppErr(400, 'faculty not found 😒');
  }

  //step-5 [check if the dept is belong to the faculty]
  const doesDeptBelongToFaculty = await AcademicDept.findOne({
    academicFaculty,
    _id: academicDept,
  });

  if (!doesDeptBelongToFaculty) {
    throw new AppErr(
      400,
      `this ${doesAcademicDeptExists.name} is not belong to this ${doesAcademicFacultyExists.name}`,
    );
  }

  //check if the same offered course in the same section is already registered
  const doesOfferedCourseSemesterSectionExists = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
  });
  if (doesOfferedCourseSemesterSectionExists) {
    throw new AppErr(400, `This section already exists in the offered courses`);
  }

  //handle time conflict
  const assignSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignSchedule, newSchedule)) {
    throw new AppErr(
      400,
      `this faculty is not available for the schedule 😶‍🌫️ Choose another one`,
    );
  }

  // return null

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

// get offered course
const getOfferedCourse = async () => {
  const result = await OfferedCourse.find().populate([
    'semesterRegistration',
    'academicSemester',
    'academicFaculty',
    'academicDept',
    'course',
    'faculty',
  ]);
  return result;
};

// update offered course
const updateOfferedCourse = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;

  const doesOfferedCourseExists = await OfferedCourse.findById(id);

  if (!doesOfferedCourseExists) {
    throw new AppErr(400, 'offered Course does not found 😒');
  }

  const doesFacultyExists = await Faculty.findById(faculty);

  if (!doesFacultyExists) {
    throw new AppErr(400, 'faculty does not found 😒');
  }

  const semesterRegistration = doesOfferedCourseExists.semesterRegistration;

  const semesterRegStatus =
    await SemesterRegistration.findById(semesterRegistration);
  if (semesterRegStatus?.status !== 'upcoming') {
    throw new AppErr(
      400,
      `Can not update this offered course as it is ${semesterRegStatus?.status}`,
    );
  }

  //handle time conflict
  const assignSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignSchedule, newSchedule)) {
    throw new AppErr(
      400,
      `this faculty is not available for the schedule 😶‍🌫️ Choose another one`,
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const offeredCourseService = {
  createOfferedCourse,
  getOfferedCourse,
  updateOfferedCourse,
};
