import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppErr from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

/*
//  using callback functionalities

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log({ token });

    // is token is sent from the client
    if (!token) {
      throw new AppErr(401, 'Unauthorized access 😰');
    }

    // check if the token is valid
    jwt.verify(
      token,
      config.jwt_access_token as string,
      function (err, decoded) {
        // err
        if (err) {
          throw new AppErr(401, 'access token is not valid 😰');
        }
        // decoded undefined
        // console.log({decoded});

        const role = (decoded as JwtPayload).role;
        // console.log({role});
        // check the required roles
        if (requiredRole && !requiredRole.includes(role)) {
          throw new AppErr(401, 'Access denied: Valid role required 🚫');
        }

        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};
*/

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log({ token });

    // is token is sent from the client
    if (!token) {
      throw new AppErr(401, 'Unauthorized access 😰');
    }

    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    // check the user is exist
    const user = await User.doesUserExistsByCustomId(userId);
    if (!user) {
      throw new AppErr(400, 'user does not exist 🤒');
    }

    // checking if the user is deleted

    if (await User.isDeletedCustomStaticMethod(userId)) {
      throw new AppErr(400, 'user is deleted 😵');
    }

    // check if the user is blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
      throw new AppErr(400, 'user is blocked');
    }

    if (
      user.passwordChangedAt &&
      User.hasJWTExpiredAfterPasswordChange(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppErr(401, 'Access denied: you are not authorized 🚫');
    }
    if (requiredRole && !requiredRole.includes(role)) {
      // console.log({role});
      // check the required roles
      throw new AppErr(401, 'Access denied: Valid role required 🚫');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
