import { RegisterForm } from "../pages/SignUp";
import { AuthResponse } from "../types/auth.type";
import http from "../utils/http";

export const URL_LOGIN = "/authenticate/";
export const URL_REGISTER = "register";
export const URL_LOGOUT = "logout";
export const URL_REFRESH_TOKEN = "refresh-access-token";

export interface Credential {
  username: string;
  password: string;
}

const authApi = {
  login: (credential: Credential) =>
    http.post<AuthResponse>("/authenticate/", credential),
  register: (registerData: RegisterForm) =>
    http.post("/api/customers/", registerData),
  activeAccount: (id: string | undefined) => http.get(`/api/customers/${id}/`),
};
export default authApi;
