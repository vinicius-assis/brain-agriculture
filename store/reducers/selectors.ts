import { RootState } from "../index";

export const getMenuState = (state: RootState) => state.application.showMenu;
