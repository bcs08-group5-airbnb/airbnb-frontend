import { createSlice } from "@reduxjs/toolkit";
import { userLocalStorage } from "../api/localService";

const initialState = {
  user: userLocalStorage.get(),
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLogin } = userSlice.actions;
export default userSlice.reducer;
