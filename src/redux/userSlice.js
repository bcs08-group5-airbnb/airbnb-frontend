import { createSlice } from "@reduxjs/toolkit";
import { userAdminLocalStorage, userLocalStorage } from "../api/localService";

const initialState = {
  user: userLocalStorage.get(),
  userAdmin: userAdminLocalStorage.get(),
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
    },
    setLoginAdmin: (state, action) => {
      state.userAdmin = action.payload;
    },
  },
});

export const { setLogin, setLoginAdmin } = userSlice.actions;
export default userSlice.reducer;
