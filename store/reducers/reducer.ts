import { createReducer } from "@reduxjs/toolkit";
import { Producer } from "../../interfaces/application";
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

interface ApplicationState {
  producers: Producer[];
  showMenu: boolean;
  showForm: boolean;
  loading: boolean;
  deleteModal: {
    show: boolean;
    id: string | undefined;
  };
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
  }));

  builder.addCase(deleteProducer.rejected, (state) => ({
    ...state,
    loading: false,
  }));

  builder.addCase(deleteProducer.fulfilled, (state, action) => {
    const updateItems = state.producers.filter(
      ({ id }) => id !== action.payload.id
    );
    console.log(updateItems);
    return {
      ...state,
      loading: false,
      producers: updateItems,
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
