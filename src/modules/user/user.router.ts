import { Router } from 'express';
import { userController } from './user.controller';

const userRouter = Router();

userRouter.post('/create-student', userController.createStudent);

export default userRouter;

// user -> then student
