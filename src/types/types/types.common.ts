export type CreateAccessCodeRequest = {
  phoneNumber: string;
};

export type ValidateAccessCodeRequest = {
  phoneNumber: string;
  accessCode: string;
};

export type LikeGithubUserRequest = {
  phone_number: string;
  github_user_id: string;
}; 