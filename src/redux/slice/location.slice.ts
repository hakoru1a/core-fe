import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface Location {
  address?: string;
  lat?: number;
  lng?: number;
}
const initialState: Location = {};
const locationSlice = createSlice({
  name: "location",
  initialState: initialState,
  reducers: {
    setLocation(_, action: PayloadAction<Location>) {
      return {
        ...action.payload,
      };
    },
  },
});

const locationReducer = locationSlice.reducer;
export const { setLocation } = locationSlice.actions;
export default locationReducer;
