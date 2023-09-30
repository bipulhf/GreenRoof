import { configureStore } from "@reduxjs/toolkit";
import deliveredNotifs from "./deliveredNotifs";

const store = configureStore({
  reducer: {
    deliveredNotifs: deliveredNotifs,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
