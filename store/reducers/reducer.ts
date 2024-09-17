import { createReducer } from "@reduxjs/toolkit";
import { Producer } from "../../interfaces/application";
import {
  createProducer,
  deleteProducer,
  fetchProducers,
  toggleForm,
  toggleMenu,
  updateProducer,
} from "./actions";

interface ApplicationState {
  producers: Producer[];
  showMenu: boolean;
  showForm: boolean;
  loading: boolean;
}

const initialState: ApplicationState = {
  producers: [],
  showMenu: false,
  showForm: false,
  loading: false,
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

  builder.addCase(fetchProducers.fulfilled, (state, action) => ({
    ...state,
    loading: false,
    producers: action.payload.data,
  }));

  builder.addCase(createProducer.pending, (state) => ({
    ...state,
    loading: true,
  }));

  builder.addCase(createProducer.rejected, (state) => ({
    ...state,
    loading: false,
  }));

  builder.addCase(createProducer.fulfilled, (state, action) => ({
    ...state,
    loading: false,
    producers: [...state.producers, action.payload.data],
  }));

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
    return {
      ...state,
      loading: false,
      producers: state.producers.map((producer) =>
        producer.id === updatedProducer.id ? updatedProducer : producer
      ),
    };
  });

  builder.addCase(deleteProducer.pending, (state) => ({
    ...state,
    loading: true,
    producers: [],
  }));

  builder.addCase(deleteProducer.rejected, (state) => ({
    ...state,
    loading: false,
    producers: [],
  }));

  builder.addCase(deleteProducer.fulfilled, (state, action) => ({
    ...state,
    loading: false,
    producers: state.producers.filter(({ id }) => id !== action.payload.id),
  }));

  builder.addCase(toggleMenu, (state) => ({
    ...state,
    showMenu: !state.showMenu,
  }));

  builder.addCase(toggleForm, (state) => ({
    ...state,
    showForm: !state.showForm,
  }));
});
