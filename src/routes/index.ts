import Router from 'express';
import studentRouter from '../modules/student/student.router';
import userRouter from '../modules/user/user.router';
import academicSemesterRouter from '../modules/academicSemester/academicSemester.router';
import academicFacultyRouter from '../modules/academicFaculty/academicFaculty.router';
import academicDeptRouter from '../modules/academicDept/academicDept.routes';
import courseRouter from '../modules/course/course.router';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
