import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  DeleteProducerResponse,
  GetProducerResponse,
  PostProducerResponse,
  Producer,
} from "../../interfaces/application";
import { ProducerService } from "./service";

export const toggleMenu = createAction("application/toggleMenu");

export const toggleForm = createAction("application/toggleForm");

export const createProducer = createAsyncThunk<PostProducerResponse, Producer>(
  "application/fetchProducers",
  async (data) => ProducerService.createProducer(data)
);

export const fetchProducers = createAsyncThunk<GetProducerResponse>(
  "application/fetchProducers",
  async () => ProducerService.fetchProducers()
);

export const updateProducer = createAsyncThunk<
  Producer,
  { id: string; data: Partial<Producer> }
>("application/fetchProducers", async ({ id, data }) =>
  ProducerService.updateProducer(id, data)
);

export const deleteProducer = createAsyncThunk<DeleteProducerResponse, string>(
  "application/fetchProducers",
  async (id) => ProducerService.deleteProducers(id)
);
