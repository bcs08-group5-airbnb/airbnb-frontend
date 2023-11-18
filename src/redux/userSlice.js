import { createSlice } from "@reduxjs/toolkit";
import { userAdminLocalStorage, userLocalStorage } from "../api/localService";

const initialState = {
  user: userLocalStorage.get(),

  // admin page
  userAdmin: userAdminLocalStorage.get(),
  allUsers: null,
  totalUsers: null,
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
    getAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setTotalUsers: (state, action) => {
      state.totalUsers = action.payload;
    },
  },
});

export const { setLogin, setLoginAdmin, getAllUsers, setTotalUsers } =
  userSlice.actions;
export default userSlice.reducer;
