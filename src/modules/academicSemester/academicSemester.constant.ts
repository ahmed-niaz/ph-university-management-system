import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
  TSemesterAndCode,
} from './academicSemester.interface';

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const academicSemesterName: TAcademicSemesterName[] = [
  'Fall',
  'Summer',
  'Spring',
];
export const academicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

export const semesterAndCodeMapper: TSemesterAndCode = {
  Fall: '01',
  Summer: '02',
  Spring: '03',
};
