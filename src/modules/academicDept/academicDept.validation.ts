import { z } from 'zod';

const createAcademicDeptValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'academic department must be string',
      required_error: 'name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'academic department must be string',
      required_error: 'academic faculty  is required',
    }),
  }),
});

const updateAcademicDeptValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'academic department must be string',
        required_error: 'name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'academic department must be string',
        required_error: 'academic faculty  is required',
      })
      .optional(),
  }),
});

export const academicDeptValidation = {
  createAcademicDeptValidationSchema,
  updateAcademicDeptValidationSchema,
};
