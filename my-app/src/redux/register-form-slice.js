import { createSlice } from "@reduxjs/toolkit";

const RegisterFormSlice = createSlice({
  name: "registerForm",
  initialState: {
    data: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  },
  reducers: {
    updateData(state, action) {
      state.data[action.payload.data.event.target.name] =
        action.payload.data.event.target.value;
    },
  },
});

export const registerFormAction = RegisterFormSlice.actions;
export default RegisterFormSlice;
