import { z } from 'zod';
const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'password must be string',
    })
    .max(24, { message: 'password length can not more than 24 char' })
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
};
