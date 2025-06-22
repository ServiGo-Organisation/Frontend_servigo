import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Features/user/userSlice";
import servicesSlice from "./Features/services/servicesSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    services: servicesSlice,
  },
});
