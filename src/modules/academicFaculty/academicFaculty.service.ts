import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFaculty = async (payload: IAcademicFaculty) => {
  const faculty = await AcademicFaculty.create(payload);
  return faculty;
};

const getAcademicFaculties = async () => {
  const faculty = await AcademicFaculty.find();
  return faculty;
};

const singleAcademicFaculty = async (id: string) => {
  const faculty = await AcademicFaculty.findById(id);
  return faculty;
};

const updatedAcademicFaculty = async (
  id: string,
  payload: IAcademicFaculty,
) => {
  const faculty = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return faculty;
};

export const academicFacultyService = {
  createAcademicFaculty,
  getAcademicFaculties,
  singleAcademicFaculty,
  updatedAcademicFaculty,
};
