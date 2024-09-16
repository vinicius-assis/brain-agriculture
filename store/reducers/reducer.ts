import { createReducer } from "@reduxjs/toolkit";
import { Farm, Modal, Profile } from "../../interfaces/application";
import { closeModal, openModal } from "./actions";

interface ApplicationState {
  profiles: Profile[];
  farms: Farm[];
  modalState: Modal;
}

const initialState: ApplicationState = {
  profiles: [],
  farms: [],
  modalState: {
    show: false,
    name: null,
  },
};

export const ApplicationReducer = createReducer(initialState, (builder) => {
  builder.addCase(openModal, (state, action) => ({
    ...state,
    modalState: {
      show: true,
      name: action.payload,
    },
  }));

  builder.addCase(closeModal, (state) => ({
    ...state,
    modalState: {
      show: false,
      name: null,
    },
  }));
});
