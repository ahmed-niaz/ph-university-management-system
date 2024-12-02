import express, { Application, NextFunction, Request, Response } from 'express';
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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(err, req, res, next);
});

// not found
app.use((req: Request, res: Response, next: NextFunction) => {
  notFound(req, res, next);
});

export default app;
