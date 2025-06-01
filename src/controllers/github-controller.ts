import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { ApiSuccess } from '../utils/ApiSuccess';
import { asyncMiddleware } from '../middleware/async-middleware';
import { githubService } from '../services/github.service';

export const githubController = {
  searchGithubUsers: asyncMiddleware(async (req: Request, res: Response) => {
    const { q, page = 1, per_page = 10 } = req.query;
    const phoneNumber = req.headers['x-phone-number'] as string;

    if (!q) {
      throw new ApiError('Search query is required', 400);
    }

    if (!phoneNumber) {
      throw new ApiError('Authentication required', 401);
    }

    const result = await githubService.searchUsers(
      q as string,
      Number(page),
      Number(per_page),
      phoneNumber
    );

    new ApiSuccess('Github users retrieved successfully', result).send(res);
  }),

  findGithubUserProfile: asyncMiddleware(async (req: Request, res: Response) => {
    const { phone_number } = req.query;
    const profiles = await githubService.findLikedProfiles(phone_number as string);
    new ApiSuccess('Github user profiles retrieved successfully', profiles).send(res);
  }),

  likeGithubUser: asyncMiddleware(async (req: Request, res: Response) => {
    const { phone_number, github_user_id } = req.body;
    const isLiked = await githubService.toggleLike(phone_number, github_user_id);
    new ApiSuccess(
      isLiked ? 'Github user liked successfully' : 'Github user unliked successfully'
    ).send(res);
  }),
}; 