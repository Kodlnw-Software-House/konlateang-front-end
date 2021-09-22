import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: { auth: AuthSlice.reducer, ui: uiSlice.reducer },
});

export default store;
