import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialAuthState = {
  user: Cookies.get("user") || null,
  admin: Cookies.get("admin") || null,
  msAuth: Cookies.get("ms-auth") || null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.user = Cookies.get("user");
    },
    msLogin(state) {
      state.msAuth = Cookies.get("ms-auth");
    },
    logout(state) {
      state.user = false;
      state.msAuth = false;
      state.admin = false;
    },
    adminLogin(state) {
      state.admin = Cookies.get("admin");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
