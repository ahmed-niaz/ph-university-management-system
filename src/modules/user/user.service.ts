import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppErr from '../../errors/AppError';


const createStudent = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // create isolated environment (session)
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    if (!admissionSemester) {
      throw new Error('admissionSemester id is not valid');
    }

    // set generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction - 1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppErr(404,'Failed to create new user');
    }

    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id

    // create a student (transaction - 2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppErr(404,'Failed to create new student');
    }

    // Commit the transaction
    await session.commitTransaction();

    return newStudent;
  } catch (err) {
    // Abort the transaction
    await session.abortTransaction();

    // Optionally log the error
    console.error('Error in createStudent:', err);

    // Rethrow the error for higher-level handling
    throw err;
  } finally {
    // Always end the session
    await session.endSession();
  }
};

export const userService = {
  createStudent,
};
