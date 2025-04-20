import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Features/user/userSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
