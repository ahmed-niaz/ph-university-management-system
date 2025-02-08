import mongoose from 'mongoose';
// import { TStudent } from './student.interface';
import { Student } from './student.model';
import AppErr from '../../errors/AppError';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/queryBuilder';
import { searchableStdFields } from './student.constant';

const getStudent = async (query: Record<string, unknown>) => {
  /*
  
  console.log('Query: ', query.searchTerm);

  // make a copy of query
  const objQuery = { ...query };
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
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  excludeFields.forEach((value) => delete objQuery[value]);
  console.log({ query, objQuery });

  //  filter query [exact match]
  const filterQuery = searchQuery
    .find(objQuery)
    .populate('admissionSemester')
    .populate({
      path: 'academicDept',
      populate: 'academicFaculty',
    });

  // return filterQuery;

  let sort = '-email';

  if (query?.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  let page = 1;
  let skip = 0;

  if (query?.limit) {
    limit = Number(query?.limit);
  }

  if (query?.page) {
    page = Number(query?.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);
  const limitQuery = paginateQuery.limit(limit);

  // field limiting
  let fields = '-__v';

  if (query?.fields) {
    fields = (query.fields as string).split(',').join(' ');
    console.log({ fields });
  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;

  */

  const stdQuery = new QueryBuilder(
    Student.find().populate('admissionSemester').populate({
      path: 'academicDept',
      populate: 'academicFaculty',
    }),
    query,
  )
    .search(searchableStdFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await stdQuery.modelQuery;

  return result;
};

const singleStudent = async (id: string) => {
  const result = await Student.findById( id )
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

    const deletedStd = await Student.findByIdAndUpdate(
      id ,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStd) {
      throw new AppErr(400, 'Failed to delete student');
    }

    // const user_id from deleted STD
    const userID = deletedStd.user;

    const deletedUser = await User.findByIdAndUpdate(
      userID,
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

/*

    
    
    
*/
