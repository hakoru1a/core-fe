import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user.type";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getProfileFromLS } from "../../utils/auth";

const user: User = {
  id: "",
  email: "",
  fullname: "",
  date_of_birth: "",
  avatar: "",
  address: "",
  phone: "",
  occupation: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: getProfileFromLS() || user,
  reducers: {
    setGlobalUser(_, action: PayloadAction<User>) {
      return {
        ...action.payload,
      };
    },
  },
});

const userReducer = userSlice.reducer;
export const { setGlobalUser } = userSlice.actions;
export default userReducer;
