import { createSlice } from "@reduxjs/toolkit";
import { userLocalStorage } from "../api/localService";
import { DEFAULT_DATE_RANGE, DEFAULT_PEOPLE_COUNT, DEFAULT_PLACE } from "../constants/defaultValues";

const initialState = {
  user: userLocalStorage.get(),
  diaDiem: DEFAULT_PLACE,
  dateRange: DEFAULT_DATE_RANGE,
  soNguoi: DEFAULT_PEOPLE_COUNT,
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
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setNgayTraPhong: (state, action) => {
      state.ngayTraPhong = action.payload;
    },
    setSoNguoi: (state, action) => {
      state.soNguoi = action.payload;
    },
  },
});

export const { setLogin, setDiaDiem, setDateRange, setSoNguoi } = userSlice.actions;
export default userSlice.reducer;
