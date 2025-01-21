import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    authToken: null,
  },

  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.authToken = action.payload.authToken;

      localStorage.setItem("authToken", action.payload.authToken);
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.authToken = null;

      localStorage.removeItem("authToken");
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
