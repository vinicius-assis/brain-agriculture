import { createReducer } from "@reduxjs/toolkit";
import { ChartsData, Producer } from "../../interfaces/application";
import {
  closeDeleteModal,
  createProducer,
  deleteProducer,
  fetchProducers,
  openDeleteModal,
  toggleForm,
  toggleMenu,
  updateProducer,
} from "./actions";
import generateChartsData from "@/helpers/generateChartsData";

interface ApplicationState {
  producers: Producer[];
  showMenu: boolean;
  showForm: boolean;
  loading: boolean;
  deleteModal: {
    show: boolean;
    id: string | undefined;
  };
  chartData: ChartsData | undefined;
}

const initialState: ApplicationState = {
  producers: [],
  showMenu: false,
  showForm: false,
  loading: true,
  deleteModal: {
    show: false,
    id: "",
  },
  chartData: undefined,
};

export const ApplicationReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchProducers.pending, (state) => ({
    ...state,
    loading: true,
    producers: [],
  }));

  builder.addCase(fetchProducers.rejected, (state) => ({
    ...state,
    loading: false,
    producers: [],
  }));

  builder.addCase(fetchProducers.fulfilled, (state, action) => {
    return {
      ...state,
      loading: false,
      producers: action.payload,
      chartData: generateChartsData(action.payload),
    };
  });

  builder.addCase(createProducer.pending, (state) => ({
    ...state,
    loading: true,
  }));

  builder.addCase(createProducer.rejected, (state) => ({
    ...state,
    loading: false,
  }));

  builder.addCase(createProducer.fulfilled, (state, action) => {
    return {
      ...state,
      loading: false,
      producers: [...state.producers, action.payload.data],
      chartData: generateChartsData([...state.producers, action.payload.data]),
    };
  });

  builder.addCase(updateProducer.pending, (state) => ({
    ...state,
    loading: true,
  }));

  builder.addCase(updateProducer.rejected, (state) => ({
    ...state,
    loading: false,
  }));

  builder.addCase(updateProducer.fulfilled, (state, action) => {
    const updatedProducer = action.payload;
    const updateItems = state.producers.map((producer) =>
      producer.id === updatedProducer.id ? updatedProducer : producer
    );
    return {
      ...state,
      loading: false,
      producers: updateItems,
      chartData: generateChartsData(updateItems),
    };
  });

  builder.addCase(deleteProducer.pending, (state) => ({
    ...state,
    loading: true,
  }));

  builder.addCase(deleteProducer.rejected, (state) => ({
    ...state,
    loading: false,
  }));

  builder.addCase(deleteProducer.fulfilled, (state, action) => {
    const updateItems = state.producers.filter(
      ({ id }) => id !== action.payload.id
    );

    return {
      ...state,
      loading: false,
      producers: updateItems,
      chartData: generateChartsData(updateItems),
    };
  });

  builder.addCase(toggleMenu, (state) => ({
    ...state,
    showMenu: !state.showMenu,
  }));

  builder.addCase(toggleForm, (state) => ({
    ...state,
    showForm: !state.showForm,
  }));

  builder.addCase(openDeleteModal, (state, action) => ({
    ...state,
    deleteModal: {
      show: true,
      id: action.payload,
    },
  }));

  builder.addCase(closeDeleteModal, (state) => ({
    ...state,
    deleteModal: {
      show: false,
      id: "",
    },
  }));
});
