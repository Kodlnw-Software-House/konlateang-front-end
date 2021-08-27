import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: { token: null, isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
  },
});

export const AuthAction = AuthSlice.actions;
export default AuthSlice;
