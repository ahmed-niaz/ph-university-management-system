import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  res.send({
    status: true,
    message: `ph university management system is ⚡`,
  });
});

export default app;
