import { NextFunction, Request, Response } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const response = res.status(404).json({
    success: false,
    message: 'API not found!',
    error: '',
  });

  // Call next to satisfy lint rules
  next();

  return response;
};

export default notFound;
