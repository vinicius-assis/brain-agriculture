import { createReducer } from "@reduxjs/toolkit";
import {
  closeDeleteModal,
  createProducer,
  deleteProducer,
  fetchProducers,
  openDeleteModal,
  closeForm,
  toggleMenu,
  updateProducer,
  openForm,
} from "./actions";
import generateChartsData from "@/helpers/generateChartsData";
import { INITIAL_STATE } from "./variables";

export const ApplicationReducer = createReducer(INITIAL_STATE, (builder) => {
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

  builder.addCase(closeForm, (state) => ({
    ...state,
    formModal: {
      id: "",
      show: false,
    },
  }));

  builder.addCase(openForm, (state, action) => ({
    ...state,
    formModal: {
      id: action.payload || "",
      show: true,
    },
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
