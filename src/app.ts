import express, { Application, Request, Response } from 'express';
// import userRouter from './modules/user/user.router';
// import studentRouter from './modules/student/student.router';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import router from './routes';

const app: Application = express();

app.use(express.json());

// application routes
app.use('/api', router);

app.get('/', async (req: Request, res: Response) => {
  res.send({
    status: true,
    message: `ph university management system is ⚡`,
  });
});

app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
