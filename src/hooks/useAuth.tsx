import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "../types/user.type";
export const useAuth = (): User => {
  const user = useSelector((state: RootState) => state.user);
  return user;
};
