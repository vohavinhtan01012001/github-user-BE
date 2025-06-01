import { User } from '../entities/User';
import 'express';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Request {
      user?: {
        phoneNumber: string;
      }
    }
  }
}
