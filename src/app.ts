import express, { Application, Request, Response } from 'express';
import userRouter from './modules/user/user.router';
import studentRouter from './modules/student/student.router';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app: Application = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/student', studentRouter);

app.get('/', async (req: Request, res: Response) => {
  res.send({
    status: true,
    message: `ph university management system is ⚡`,
  });
});

app.use(globalErrorHandler);
export default app;
