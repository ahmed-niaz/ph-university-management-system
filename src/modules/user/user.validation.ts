import { z } from 'zod';
import { userStatus } from './user.constant';
const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'password must be string',
    })
    .max(24, { message: 'password length can not more than 24 char' })
    .optional(),
});

const changeValidationSchema = z.object({
  body: z.object({
    status: z.enum([...userStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  userValidationSchema,
  changeValidationSchema,
};
