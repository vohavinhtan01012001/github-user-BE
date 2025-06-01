import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const errorMiddleware = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      errors: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}; 