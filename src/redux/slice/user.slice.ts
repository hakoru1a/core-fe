import { createSlice } from "@reduxjs/toolkit";

const useSlice = createSlice({
  name: "blog",
  initialState: {},
  reducers: {},
});

const userReducer = useSlice.reducer;
// export const {} = useSlice.actions;
export default userReducer;
