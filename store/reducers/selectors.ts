import { RootState } from "../index";

export const getMenuState = (state: RootState) => state.application.showMenu;

export const getFormState = (state: RootState) => state.application.showForm;
