import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  success: false;
  message: string;
  errorDetails?: any;
}

const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = error.message || 'Something went wrong 🥹';

  const errorResponse: ErrorResponse = {
    success: false,
    message,
  };

  // Optionally add error details in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.errorDetails = error;
  }

  // Log the error for server-side tracking
  console.error('Global Error Handler:', error);

  return res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;
