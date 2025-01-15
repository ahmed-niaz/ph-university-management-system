import { TStudent } from './student.interface';
import { Student } from './student.model';

const getStudent = async () => {
  const result = await Student.find().populate('admissionSemester').populate({
    path: 'academicDept',
    populate: 'academicFaculty',
  });
  return result;
};

const singleStudent = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDept',
      populate: 'academicFaculty',
    });
  return result;
};

const updateStudent = async (id: string, payload: TStudent) => {
  const result = await Student.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteStudent = async (id: string) => {
  const result = await Student.findByIdAndDelete(id);
  return result;
};

export const studentService = {
  getStudent,
  singleStudent,
  updateStudent,
  deleteStudent,
};
