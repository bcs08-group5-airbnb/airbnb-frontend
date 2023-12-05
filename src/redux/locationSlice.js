import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reload: 0,
};

const locationSlice = createSlice({
  name: "locationSlice",
  initialState,
  reducers: {
    reloadDataLocation: (state, action) => {
      state.reload += 1;
    },
  },
});

export const { reloadDataLocation } = locationSlice.actions;

export default locationSlice.reducer;
