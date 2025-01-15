import { model, Schema } from 'mongoose';
import { IAcademicDept } from './academicDept.interface';
import AppErr from '../../errors/AppError';

const academicDeptSchema = new Schema<IAcademicDept>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
  },
});

// pre middle ware hook
academicDeptSchema.pre('save', async function name(next) {
  const isDepartmentExist = await AcademicDept.findOne({ name: this.name });

  if (isDepartmentExist) {
    throw new AppErr(404,'This department is already exist');
  }

  next();
});



academicDeptSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDept.findOne(query);

  if (!isDepartmentExist) {
    throw new AppErr(404,'This department does not exist.');
  }

  next();
});

export const AcademicDept = model<IAcademicDept>(
  'AcademicDept',
  academicDeptSchema,
);
