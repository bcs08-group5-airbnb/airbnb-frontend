import { createSlice } from "@reduxjs/toolkit";
import { adminLocalStorage } from "../api/localService";

const initialState = {
  admin: adminLocalStorage.get(),
};

const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const { setLogin } = adminSlice.actions;
export default adminSlice.reducer;
