import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "./slices/HomeSlice";
import NewApplicationSlice from "./slices/NewApplicationSlice";

export const Store = configureStore({
  reducer: {
    home: HomeSlice.reducer,
    newApplication: NewApplicationSlice.reducer,
  },
});
