import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import registerSlice from "./features/registerSlice";
import authSlice from "./features/authSlice";
import profileSlice from "./features/profileSlice";
import selectImageSlice from "./features/selectImageSlice";
// -----------------------------------------------------

export const store = configureStore({
  reducer: {
    registerSlice: registerSlice,
    authSlice: authSlice,
    profileSlice: profileSlice,
    selectImageSlice: selectImageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
