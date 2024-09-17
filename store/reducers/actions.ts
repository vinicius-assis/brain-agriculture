import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  DeleteProducerResponse,
  GetProducerResponse,
  PostProducerResponse,
  Producer,
} from "../../interfaces/application";
import { ProducerService } from "./service";

export const toggleMenu = createAction("application/toggleMenu");

export const openForm = createAction<string | undefined>(
  "application/openForm"
);

export const closeForm = createAction("application/closeForm");

export const openDeleteModal = createAction<string | undefined>(
  "application/openDeleteModal"
);

export const closeDeleteModal = createAction("application/closeDeleteModal");

export const createProducer = createAsyncThunk<PostProducerResponse, Producer>(
  "application/createProducer",
  async (data) => ProducerService.createProducer(data)
);

export const fetchProducers = createAsyncThunk<GetProducerResponse>(
  "application/fetchProducers",
  async () => ProducerService.fetchProducers()
);

export const updateProducer = createAsyncThunk<
  Producer,
  { id: string; data: Partial<Producer> }
>("application/updateProducer", async ({ id, data }) =>
  ProducerService.updateProducer(id, data)
);

export const deleteProducer = createAsyncThunk<DeleteProducerResponse, string>(
  "application/deleteProducer",
  async (id) => ProducerService.deleteProducers(id)
);
