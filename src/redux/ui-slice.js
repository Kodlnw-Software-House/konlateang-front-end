import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    theme: "patientTheme",
    notification: null,
  },
  reducers: {
    toggleTheme(state, action) {
      state.theme = action.payload.theme;
    },
    setNoti(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    clearNoti(state) {
      state.notification = null;
    },
    resetSlice(state) {
      state = {
        theme: "patientTheme",
        notification: null,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
