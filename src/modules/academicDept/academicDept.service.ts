import { TAcademicDept } from '../student/student.interface';
import { IAcademicDept } from './academicDept.interface';
import { AcademicDept } from './academicDept.model';

const createAcademicDept = async (payload: TAcademicDept) => {
  /**
 *  const isDepartmentExist = await AcademicDept.findOne({name: payload.name})
  if(isDepartmentExist) {
    throw new Error('This department is already exist')
  }
 * */

  const result = await AcademicDept.create(payload);
  return result;
};

const getAcademicDept = async () => {
  const result = await AcademicDept.find().populate('academicFaculty');
  return result;
};

const singleAcademicDept = async (id: string) => {
  const result = await AcademicDept.findById(id);
  return result;
};

const updatedAcademicDept = async (id: string, payload: IAcademicDept) => {

  console.log("academic dept id => ", id);
  console.log('academic dept payload',payload);
  const faculty = await AcademicDept.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  console.log('faculty',faculty);
  return faculty;
};

export const academicDeptService = {
  createAcademicDept,
  getAcademicDept,
  singleAcademicDept,
  updatedAcademicDept,
};
