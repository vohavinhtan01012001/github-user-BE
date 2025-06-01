import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { ApiSuccess } from '../utils/ApiSuccess';
import { asyncMiddleware } from '../middleware/async-middleware';
import { firebaseService } from '../services/firebase.service';

export const authController = {
    createNewAccessCode: asyncMiddleware(async (req: Request, res: Response) => {
        const { phoneNumber } = req.body;

        if (!phoneNumber) {
            throw new ApiError('Phone number is required', 400);
        }

        const accessCode = Math.floor(100000 + Math.random() * 900000).toString();

        await firebaseService.saveOTP(phoneNumber, accessCode);

        new ApiSuccess('Access code sent to your phone number', { success: true, accessCode: accessCode }).send(res);
    }),

    validateAccessCode: asyncMiddleware(async (req: Request, res: Response) => {
        const { phoneNumber, accessCode } = req.body;

        if (!phoneNumber || !accessCode) {
            throw new ApiError('Phone number and access code are required', 400);
        }

        const isValid = await firebaseService.verifyOTP(phoneNumber, accessCode);
        if (!isValid) {
            throw new ApiError('Invalid or expired access code', 401);
        }

        new ApiSuccess('Access code validated successfully', { success: true }).send(res);
    }),
}; 