import { Router } from 'express';
import { githubController } from '../controllers/github-controller';

const router = Router();

router.get('/searchGithubUsers', githubController.searchGithubUsers);
router.get('/findGithubUserProfile', githubController.findGithubUserProfile);
router.post('/likeGithubUser', githubController.likeGithubUser);

export default router; 