import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { firebaseService } from '../services/firebase.service';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const phoneNumber = req.headers['x-phone-number'] as string;

    if (!phoneNumber) {
      throw new ApiError('Authentication required', 401);
    }

    const isValid = await firebaseService.isAuthenticated(phoneNumber);
    if (!isValid) {
      throw new ApiError('Authentication required', 401);
    }

    req.user = { phoneNumber };
    next();
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError('Authentication failed', 401));
  }
};
