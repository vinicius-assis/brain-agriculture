import { createAction } from "@reduxjs/toolkit";

export const openModal = createAction<string>("application/openModal");

export const closeModal = createAction("application/closeModal");
