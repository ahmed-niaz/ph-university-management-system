import { Student } from './student.model';

const getStudent = async () => {
  const result = await Student.find();
  return result;
};

const singleStudent = async (id: string) => {
  const result = await Student.findById(id);
  return result;
};

export const studentService = {
  getStudent,
  singleStudent,
};
