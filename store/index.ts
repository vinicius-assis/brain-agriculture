import { configureStore } from "@reduxjs/toolkit";
import { ApplicationReducer } from "./reducers/reducer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      application: ApplicationReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
