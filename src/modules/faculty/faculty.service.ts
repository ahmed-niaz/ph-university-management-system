import QueryBuilder from '../../builder/queryBuilder';
import { Faculty } from './faculty.model';

const getFaculties = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(Faculty.find(), query);
  const result = await facultyQuery.modelQuery;
  return result;
};

export const facultiesService = {
  getFaculties,
};
