/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//  set " " after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// create actual function [re-useable custom statics method]
userSchema.statics.doesUserExistsByCustomId = async function (id: string) {
  // explicity select password
  return await User.findOne({ id }).select('+password');
};

// custom isDeleted statics method
userSchema.statics.isDeletedCustomStaticMethod = async function (id: string) {
  const user = await this.findOne({ id });
  return user?.isDeleted;
};

// custom static method
userSchema.statics.doesPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// custom statics method for auth
userSchema.statics.hasJWTExpiredAfterPasswordChange = async function (
  timeStampPasswordChange: Date,
  timeStampJWTissued: number,
) {
  const passwordChangedTime =
    new Date(timeStampPasswordChange).getTime() / 1000;
  return passwordChangedTime > timeStampJWTissued;
};

export const User = model<TUser, UserModel>('User', userSchema);
