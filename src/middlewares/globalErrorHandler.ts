// /*
import { Request, Response, NextFunction } from 'express';

interface ErrorDetails {
  name?: string;
  message?: string;
  stack?: string;
}

interface ErrorResponse {
  success: false;
  message: string;
  errorDetails?: ErrorDetails;
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
    errorResponse.errorDetails = {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  // Log the error for server-side tracking
  console.error('Global Error Handler:', error);

  next(error);

  return res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;

// */

/*
9.33
success
message
errorSource: [
path: " "
message: " "
]
stack
*/
