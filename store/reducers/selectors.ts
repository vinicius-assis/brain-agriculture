import { RootState } from "../index";

export const getMenuState = (state: RootState) => state.application.showMenu;

export const getFormState = (state: RootState) => state.application.showForm;

export const getDeleteModal = (state: RootState) =>
  state.application.deleteModal;

export const getLoadingState = (state: RootState) => state.application.loading;

export const getProducers = (state: RootState) => state.application.producers;

export const getChartData = (state: RootState) => state.application.chartData;
