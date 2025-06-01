export interface IGithubUser {
  login: string;
  id: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
}

export interface IUserProfile {
  phoneNumber: string;
  favorite_github_users: IGithubUser[];
}

export interface IAccessCodeResponse {
  accessCode: string;
}

export interface IValidateAccessCodeResponse {
  success: boolean;
} 