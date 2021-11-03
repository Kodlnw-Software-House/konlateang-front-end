import { createSlice } from "@reduxjs/toolkit";

const currentTheme =
  localStorage.getItem("role") === "PATIENT"
    ? "patientTheme"
    : localStorage.getItem("role") === "HOSPITAL"
    ? "hospitalTheme"
    : localStorage.getItem("role") === "ADMIN"
    ? "adminTheme"
    : "patientTheme";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    theme: currentTheme,
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
