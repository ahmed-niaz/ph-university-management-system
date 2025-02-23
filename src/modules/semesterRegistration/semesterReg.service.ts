import QueryBuilder from '../../builder/queryBuilder';
import AppErr from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { RegistrationStatusObj } from './semesterReg.constant';
import { TSemesterRegistration } from './semesterReg.interface';
import { SemesterRegistration } from './semesterReg.model';

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester;

  // step-1 [check if there any semester already  upcoming or ongoing]
  const hasUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
    $or: [
      { status: RegistrationStatusObj.upcoming },
      { status: RegistrationStatusObj.ongoing },
    ],
  });

  if (hasUpcomingOrOngoingSemester) {
    throw new AppErr(
      400,
      `there is already a ${hasUpcomingOrOngoingSemester.status} semester 🙈`,
    );
  }

  // step-2 [  // check the semester is exist or not]

  const isAcademicSemester = await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemester) {
    throw new AppErr(404, 'academic Semester not found');
  }

  // step-3 [ does semester already exists]
  const doesSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (doesSemesterRegistrationExist) {
    throw new AppErr(400, 'Academic semester already exists.');
  }

  // step-4[create semester registration]
  const result = await SemesterRegistration.create(payload);
  return result;
};

// get all semester registration
const getSemesterRegistrations = async (query: Record<string, unknown>) => {
  const semesterRegQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegQuery.modelQuery;
  return result;
};

const singleSemesterRegistration = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');

  return result;
};

const updateSemesterRegistration = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // step-1 [check if the requested registered semester is exists]
  const doesSemesterRegistrationExist = await SemesterRegistration.findById(id);

  if (!doesSemesterRegistrationExist) {
    throw new AppErr(400, 'Academic semester does not exists.');
  }

  // step-2[if the semester is ended,we will not update anything]
  const currentSemesterStatus = doesSemesterRegistrationExist?.status;
  const requestSemesterStatus = payload?.status;

  if (currentSemesterStatus === RegistrationStatusObj.ended) {
    throw new AppErr(
      400,
      `This semester is already ${currentSemesterStatus} 💡`,
    );
  }

  // upcoming --> ongoing --> ended
  if (
    currentSemesterStatus === RegistrationStatusObj.upcoming &&
    requestSemesterStatus === RegistrationStatusObj.ended
  ) {
    throw new AppErr(
      400,
      `You can not directly change status form ${currentSemesterStatus} to ${requestSemesterStatus} `,
    );
  }

  // ongoing !--> upcoming
  if (
    currentSemesterStatus === 'ongoing' &&
    requestSemesterStatus === 'upcoming'
  ) {
    throw new AppErr(
      400,
      `You can not directly change status form ${currentSemesterStatus} to ${requestSemesterStatus} `,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const semesterRegistrationService = {
  createSemesterRegistration,
  getSemesterRegistrations,
  singleSemesterRegistration,
  updateSemesterRegistration,
};
