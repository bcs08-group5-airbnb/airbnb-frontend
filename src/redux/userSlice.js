import { createSlice } from "@reduxjs/toolkit";
import { userLocalStorage } from "../api/localService";
import { DEFAULT_CHOSEN_PLACE } from "../constants/defaultValues";

const initialState = {
  user: userLocalStorage.get(),
  diaDiem: DEFAULT_CHOSEN_PLACE,
  ngayNhanPhong: null,
  ngayTraPhong: null,
  soNguoi: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
    },
    setDiaDiem: (state, action) => {
      state.diaDiem = action.payload;
    },
    setNgayNhanPhong: (state, action) => {
      state.ngayNhanPhong = action.payload;
    },
    setNgayTraPhong: (state, action) => {
      state.ngayTraPhong = action.payload;
    },
    setSoNguoi: (state, action) => {
      state.soNguoi = action.payload;
    },
  },
});

export const { setLogin, setDiaDiem, setNgayNhanPhong, setNgayTraPhong, setSoNguoi } = userSlice.actions;
export default userSlice.reducer;
