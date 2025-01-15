import { Types } from 'mongoose';

export interface IAcademicDept {
  name: string;
  academicFaculty: Types.ObjectId;
}
