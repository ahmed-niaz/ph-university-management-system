import mongoose from 'mongoose';
// import { TStudent } from './student.interface';
import { Student } from './student.model';
import AppErr from '../../errors/AppError';
import { User } from '../user/user.model';

const getStudent = async (query: Record<string, unknown>) => {
  console.log('Query: ', query.searchTerm);

  // make a copy of query
  const objQuery = {...query}
  // {email: {regex: query.searchTerm, $options: i}}
  const searchableStdFields = ['email', 'name.firstName', 'presentAddress'];

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: searchableStdFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // filtering [the thing we don't need in query]
const excludeFields = ['searchTerm','sort','limit']

excludeFields.forEach(value => delete objQuery[value])
console.log({query,objQuery});


//  filter query [exact match]
  const filterQuery =  searchQuery.find(objQuery).populate('admissionSemester').populate({
    path: 'academicDept',
    populate: 'academicFaculty',
  });
  

  // return filterQuery;

let sort = '-__v'

if (query?.sort) {
  sort = query.sort as string;
}

const sortQuery = filterQuery.sort(sort);

let limit = 1;

if(query?.limit ) {
  limit = query?.limit as number;
}

const limitQuery = await sortQuery.limit(limit)

  return limitQuery;
};

const singleStudent = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDept',
      populate: 'academicFaculty',
    });
  return result;
};

// const updateStudent = async (id: string, payload: TStudent) => {
//   console.log("update student id => ",id);
//   console.log("payload student data => ",payload);

//   const result = await Student.findByIdAndUpdate({ _id: id  }, payload );
//   console.log(result);
//   return result;
// };

const deleteStudent = async (id: string) => {
  // start session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStd = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStd) {
      throw new AppErr(400, 'Failed to delete student');
    }

    const deletedUser = await User.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppErr(400, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const studentService = {
  getStudent,
  singleStudent,
  // updateStudent,
  deleteStudent,
};
