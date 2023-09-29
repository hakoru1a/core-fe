import { User } from "./user.type";
import { SuccessResponse } from "./utils.type";

export type AuthResponse = SuccessResponse<{
  accessToken: string;
  refreshToken: string;
  expirationDate: Date;
  user: User;
}>;

export type RefreshTokenReponse = SuccessResponse<{ access_token: string }>;
