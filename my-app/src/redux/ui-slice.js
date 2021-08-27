import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { theme: 'patientTheme', notification: null },
  reducers: {
    toggleTheme(state,action) {
      state.theme = action.payload.theme;
    },
    // setNoti(state, action) {
    //   state.notification = {
    //     status: action.payload.status,
    //     title: action.payload.mtitle,
    //     message: action.payload.message,
    //   };
    // },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
