/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { userRole } from './user.constant';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  status: 'in-progress' | 'blocked';
  role: 'admin' | 'student' | 'faculty';
  isDeleted: boolean;
}

// [re-useable custom statics method]
export interface UserModel extends Model<TUser> {
  // function definition [static method]
  doesUserExistsByCustomId(id: string): Promise<TUser>;

  //  custom isDeleted statics method
  isDeletedCustomStaticMethod(id: string): Promise<boolean>;

  doesPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  // auth
  hasJWTExpiredAfterPasswordChange(
    timeStampPasswordChange: Date,
    timeStampJWTissued: number,
  ): boolean;
}

// re-useable statics custom method for auth

export type TUserRole = keyof typeof userRole;
