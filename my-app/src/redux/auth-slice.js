import { createSlice } from "@reduxjs/toolkit";

let token;
let login = false;
const retreiveToken = localStorage.getItem("token");
if (retreiveToken) {
  token = retreiveToken;
} else {
  token = null;
}

if (token) {
  login = true;
}

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    token: token,
    isLoggedIn: login,
    user: {
      email: "",
      fName: "",
      lName: "",
    },
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.email;
      localStorage.setItem("token", state.token);
      state.isLoggedIn = true;
      state.user.email = action.payload.email;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const AuthAction = AuthSlice.actions;
export default AuthSlice;
