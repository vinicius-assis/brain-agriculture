import { createReducer } from "@reduxjs/toolkit";
import { Farm, Profile } from "../../interfaces/application";
import { toggleForm, toggleMenu } from "./actions";

interface ApplicationState {
  profiles: Profile[];
  farms: Farm[];
  showMenu: boolean;
  showForm: boolean;
}

const initialState: ApplicationState = {
  profiles: [],
  farms: [],
  showMenu: false,
  showForm: false,
};

export const ApplicationReducer = createReducer(initialState, (builder) => {
  builder.addCase(toggleMenu, (state) => ({
    ...state,
    showMenu: !state.showMenu,
  }));

  builder.addCase(toggleForm, (state) => ({
    ...state,
    showForm: !state.showForm,
  }));
});
