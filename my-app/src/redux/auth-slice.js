import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isLoggedIn: true,
    user: {
      email: "",
      fName: "",
      lName: "",
    },
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
  },
});

export const AuthAction = AuthSlice.actions;
export default AuthSlice;
