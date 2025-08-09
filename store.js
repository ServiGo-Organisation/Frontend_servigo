import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Features/user/userSlice";
import servicesSlice from "./Features/services/servicesSlice";
import locationSlice from "./Features/location/locationSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    services: servicesSlice,
    localisation: locationSlice,
  },
});
