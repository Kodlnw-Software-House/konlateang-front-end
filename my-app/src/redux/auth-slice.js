import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../components/functions/services/auth-header";

const token = localStorage.getItem("user")
  ? localStorage.getItem("user")
  : null;
let loggedIn = token ? true : false;

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await http.post("/patient/login", {
        email: email,
        password: password,
      });
      let data = await response.data;
      if (response.status === 201) {
        localStorage.setItem("user", data.token);
        return data;
      } else {
        console.log("else", data);
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (
    { email, password, citizen_id, fname, lname, age, dob, address },
    thunkAPI
  ) => {
    try {
      const response = await http.post("/patient/register", {
        email,
        password,
        citizen_id,
        fname,
        lname,
        age,
        dob,
        address,
      });
      let data = await response.data;
      if (response.status === 201) {
        localStorage.setItem("user", data.token);
        return data;
      } else {
        console.log("else", data);
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (error) {
      if (!error.response) {
        console.log("error", error);
        throw error;
      }
      console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    token: token,
    isLoggedIn: loggedIn,
    user: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState(state) {
      state.isError = false;
      state.isFetching = false;
      state.isSuccess = false;
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    clearStatus(state) {
      state.isError = false;
      state.isFetching = false;
      state.isSuccess = false;
    },
    userLoggedIn(state) {
      state.isLoggedIn = true;
    },
    userLogedOut(state) {
      localStorage.removeItem("user");
      state.token = null;
      state.isLoggedIn = false;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
  },
  extraReducers: {
    [userLogin.fulfilled]: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.patient;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
    [userLogin.pending]: (state) => {
      state.isFetching = true;
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.patient;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [userRegister.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.error;
    },
    [userRegister.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const AuthAction = AuthSlice.actions;
export const AuthSelecter = (state) => state.auth;
export default AuthSlice;
