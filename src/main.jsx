import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/userSlice";
import spinnerSlice from "./redux/spinnerSlice";
import roomSlice from "./redux/roomSlice";
import locationSlice from "./redux/locationSlice";

import "alpinejs";

export const store = configureStore({
  reducer: {
    userSlice,
    spinnerSlice,
    roomSlice,
    locationSlice,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
