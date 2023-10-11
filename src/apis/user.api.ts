import { ChangePasswordType, User } from "../types/user.type";
import { SuccessResponse } from "../types/utils.type";
import http from "../utils/http";

export const CURRENT_USER = "/authenticate/current-customer/";
export const UPDATE_USER = "/api/customers/update-profile/";
export const CHANGE_PASSWORD = (id: string) =>
  `/api/customers/change-password/${id}/`;

export const CHANGE_AVATAR = (id: string) => `/api/customers/avatar/${id}/`;

export interface Credential {
  username: string;
  password: string;
}

const userApi = {
  getCurrentUser: () => http.get<SuccessResponse<User>>(CURRENT_USER),
  updateCurrentUser: (user: User) =>
    http.put<SuccessResponse<User>>(UPDATE_USER, user),

  chagePassword: (passwords: ChangePasswordType, id: string) =>
    http.patch<SuccessResponse<User>>(CHANGE_PASSWORD(id), passwords),

  changeAvatar: (avatar: File, id: string) =>
    http.patch<SuccessResponse<User>>(
      CHANGE_AVATAR(id),
      {
        image: avatar,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data;",
        },
      }
    ),
};
export default userApi;
