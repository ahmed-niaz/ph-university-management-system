import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generatedAdminId,
  generatedFacultyId,
  generateStudentId,
} from './user.utils';
import AppErr from '../../errors/AppError';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDept } from '../academicDept/academicDept.model';
import { Faculty } from '../faculty/faculty.model';
import { Admin } from '../admin/admin.model';

// create student
const createStudent = async (password: string, payload: TStudent) => {
  console.log('create std data >> [services] >>', { password, payload });
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
      throw new AppErr(404, 'Failed to create new user');
    }

    // set id, _id as user
    payload.id = newUser[0].id; // embedding id
    payload.user = newUser[0]._id; // reference _id

    // create a student (transaction - 2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppErr(404, 'Failed to create new student');
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

// create faculty
const createFaculty = async (password: string, payload: TFaculty) => {
  console.log('create std data >> [services] >>', { password, payload });
  if (!payload) {
    throw new Error(
      'Payload is undefined. Make sure you are passing the correct data.',
    );
  }

  console.log('Received Payload:', payload);
  console.log('Password:', password);

  // create a user objects
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set faculty role
  userData.role = 'faculty';

  // find academic dept info
  const academicDept = await AcademicDept.findById(payload.academicDept);

  if (!academicDept) {
    throw new AppErr(400, 'academic dept is not found');
  }

  // start session [created isolated environment]
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set generated id
    userData.id = await generatedFacultyId();

    // create user (transaction - 1)
    const newUser = await User.create([userData], { session });

    // create faculty
    if (!newUser.length) {
      throw new AppErr(400, 'failed to create user');
    }

    // set id, _id as user
    payload.id = newUser[0].id; // embedding id
    payload.user = newUser[0]._id; // ref id

    // create a faculty
    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppErr(400, 'failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
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

// create admin
const createAdmin = async (password: string, payload: TFaculty) => {
  if (!payload) {
    throw new Error(
      'Payload is undefined. Make sure you are passing the correct data.',
    );
  }

  // create user object
  const userData: Partial<TUser> = {};

  // set role
  userData.role = 'admin';

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set generated id
    userData.id = await generatedAdminId();

    // create user [transaction - 1]
    const newUser = await User.create([userData], { session });

    // create a admin
    if (!newUser.length) {
      throw new AppErr(400, 'failed to create admin');
    }

    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference id

    // create admin
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppErr(400, 'failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
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
  createFaculty,
  createAdmin,
};
