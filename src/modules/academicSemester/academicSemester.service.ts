import { semesterAndCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemester = async (payload: TAcademicSemester) => {
  // semesterAndCodeMapper['Fall'] => "01" !== '01'
  if (semesterAndCodeMapper[payload.name] !== payload.code) {
    throw new Error('invalid semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAcademicSemester = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const singleAcademicSemester = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemester = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    semesterAndCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('invalid semester code');
  }

  const result = await AcademicSemester.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const academicSemesterService = {
  createAcademicSemester,
  getAcademicSemester,
  singleAcademicSemester,
  updateAcademicSemester,
};
