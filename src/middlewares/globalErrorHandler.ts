import { Request, Response } from 'express';

const globalErrorHandler = (error: any, req: Request, res: Response) => {
  const statusCode = 500;
  const message = error.message || 'something went wrong🥹';
  return res.status(statusCode).json({
    success: false,
    message,
    error: error,
  });
};

export default globalErrorHandler;
