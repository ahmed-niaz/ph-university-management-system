import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudent = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given use default password
  userData.password = password || (config.default_password as string);
  // if (!password) {
  //   user.password = config.default_password as string;
  // }else{
  //   user.password = password
  // }

  // set student role
  userData.role = 'student';

  // set manually generated id
  userData.id = '2020-2-60-186';

  // create user
  const newUser = await User.create(userData);

  // create a student using embedding
  if (Object.keys(newUser).length) {
    // set id,_id as user
    studentData.id = newUser.id; //embedding id
    studentData.user = newUser._id; //reference id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userService = {
  createStudent,
};
