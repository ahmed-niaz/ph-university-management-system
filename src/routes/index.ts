import Router from 'express';
import studentRouter from '../modules/student/student.router';
import userRouter from '../modules/user/user.router';
import academicSemesterRouter from '../modules/academicSemester/academicSemester.router';
import academicFacultyRouter from '../modules/academicFaculty/academicFaculty.router';
import academicDeptRouter from '../modules/academicDept/academicDept.routes';
import courseRouter from '../modules/course/course.router';
import semesterRegistrationRouter from '../modules/semesterRegistration/semesterReg.router';
import offeredCourseRouter from '../modules/offeredCourse/offeredCourse.router';
import authenticationRouter from '../modules/auth/auth.router';
import facultyRouter from '../modules/faculty/faculty.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/student',
    route: studentRouter,
  },
  {
    path: '/faculties',
    route: facultyRouter,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRouter,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRouter,
  },
  {
    path: '/academic-dept',
    route: academicDeptRouter,
  },
  {
    path: '/courses',
    route: courseRouter,
  },
  {
    path: '/semester-registrations',
    route: semesterRegistrationRouter,
  },
  {
    path: '/offered-course',
    route: offeredCourseRouter,
  },
  {
    path: '/auth',
    route: authenticationRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
