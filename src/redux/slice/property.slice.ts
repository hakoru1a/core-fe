import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Property } from "../../types/property.type";

const propertySlice = createSlice({
  name: "property",
  initialState: {},
  reducers: {
    setCurrentProperty(_, action: PayloadAction<Property | undefined>) {
      return {
        ...action.payload,
      };
    },
  },
});
const propertyReducer = propertySlice.reducer;
export const { setCurrentProperty } = propertySlice.actions;
export default propertyReducer;
