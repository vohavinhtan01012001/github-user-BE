import { Router } from 'express';
import { authController } from '../controllers/auth-controller';

const router = Router();

router.post('/CreateNewAccessCode', authController.createNewAccessCode);
router.post('/ValidateAccessCode', authController.validateAccessCode);

export default router; 