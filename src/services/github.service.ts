import axios from 'axios';
import { AppDataSource } from '../config/db';
import { FavoriteGithubUser } from '../entities/FavoriteGithubUser';
import { ApiError } from '../utils/ApiError';

interface GithubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos?: number;
  followers?: number;
  liked: boolean;
}

const favoriteGithubUserRepository = AppDataSource.getRepository(FavoriteGithubUser);

export const githubService = {
  async searchUsers(query: string, page: number, perPage: number, phoneNumber: string) {
    const response = await axios.get('https://api.github.com/search/users', {
      params: { q: query, page, per_page: perPage }
    });

    const likedProfiles = await favoriteGithubUserRepository.find({
      where: { phoneNumber }
    });
    const likedIds = likedProfiles.map(profile => profile.githubUserId);

    const detailedUsers = await Promise.all(
      response.data.items.map(async (user: GithubUser) => {
        try {
          const detailResponse = await axios.get(`https://api.github.com/user/${user.id}`);
          const { public_repos, followers } = detailResponse.data;
          return {
            ...user,
            public_repos,
            followers,
            liked: likedIds.includes(user.id.toString())
          };
        } catch (error) {
          console.error(`Failed to fetch details for user ${user.id}:`, error);
          return {
            ...user,
            liked: likedIds.includes(user.id.toString())
          };
        }
      })
    );

    return {
      items: detailedUsers,
      total_count: response.data.total_count
    };
  },

  async findLikedProfiles(phoneNumber: string) {
    if (!phoneNumber) {
      throw new ApiError('Phone number is required', 400);
    }

    const favoriteUsers = await favoriteGithubUserRepository.find({
      where: { phoneNumber }
    });

    if (!favoriteUsers.length) {
      return [];
    }

    const profiles = await Promise.all(
      favoriteUsers.map(async (favorite: FavoriteGithubUser) => {
        const response = await axios.get(`https://api.github.com/user/${favorite.githubUserId}`);
        const { login, id, avatar_url, html_url, public_repos, followers } = response.data;
        return {
          login,
          id,
          avatar_url,
          html_url,
          public_repos,
          followers,
          liked: true
        };
      })
    );

    return profiles;
  },

  async toggleLike(phoneNumber: string, githubUserId: string) {
    if (!phoneNumber || !githubUserId) {
      throw new ApiError('Phone number and Github user ID are required', 400);
    }

    const existingFavorite = await favoriteGithubUserRepository.findOne({
      where: {
        phoneNumber,
        githubUserId,
      },
    });

    if (existingFavorite) {
      await favoriteGithubUserRepository.delete(existingFavorite.id);
      return false; 
    } else {
      const favorite = new FavoriteGithubUser();
      favorite.phoneNumber = phoneNumber;
      favorite.githubUserId = githubUserId;
      await favoriteGithubUserRepository.save(favorite);
      return true; 
    }
  }
}; 