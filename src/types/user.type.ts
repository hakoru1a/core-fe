export interface User {
  id: string;
  email: string;
  fullname: string;
  date_of_birth?: string;
  avatar?: string;
  address?: string;
  phone?: string;
  occupation?: string;
  about?: string;
  times: number;
}

export interface ChangePasswordType {
  currentPassword: string;
  previousPassword: string;
}
