import { TStudent } from './student.interface';
import { Student } from './student.model';

const getStudent = async () => {
  const result = await Student.find();
  return result;
};

const singleStudent = async (id: string) => {
  const result = await Student.findById(id);
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
