import generateChartsData from "../../src/helpers/generateChartsData";
import {
  closeDeleteModal,
  closeForm,
  createProducer,
  deleteProducer,
  fetchProducers,
  openDeleteModal,
  openForm,
  toggleMenu,
  updateProducer,
} from "./actions";
import { producerMock, producerMock2, updatedProducerMock } from "./mocks";
import { ApplicationReducer } from "./reducer";
import { INITIAL_STATE } from "./variables";

jest.mock("../../src/helpers/generateChartsData", () => ({
  __esModule: true,
  default: jest.fn(() => ({ chart: "mockChartData" })),
}));

describe("#Application Reducer", () => {
  it("should return the initial state", () => {
    expect(ApplicationReducer(undefined, { type: "" })).toEqual(INITIAL_STATE);
  });

  it("should change loading to true when fetch is pending", () => {
    const action = { type: fetchProducers.pending.type };
    const state = ApplicationReducer(undefined, action);
    expect(state).toEqual(
      expect.objectContaining({
        loading: true,
        producers: [],
      })
    );
  });

  it("should not change the producers list when fetch is rejected", () => {
    const action = { type: fetchProducers.rejected.type };
    const state = ApplicationReducer(undefined, action);
    expect(state).toEqual(
      expect.objectContaining({
        loading: false,
        producers: [],
      })
    );
  });

  it("should change the producers list when fetch is fulfilled", () => {
    const action = {
      type: fetchProducers.fulfilled.type,
      payload: producerMock,
    };
    const state = ApplicationReducer(undefined, action);
    expect(state).toEqual(
      expect.objectContaining({
        loading: false,
        producers: producerMock,
      })
    );
  });

  it("should change loading to true when create is pending", () => {
    const action = { type: createProducer.pending.type };
    const state = ApplicationReducer(undefined, action);
    expect(state).toEqual(
      expect.objectContaining({
        loading: true,
        producers: [],
      })
    );
  });

  it("should not change the producers list when create is rejected", () => {
    const action = { type: createProducer.rejected.type };
    const state = ApplicationReducer(undefined, action);
    expect(state).toEqual(
      expect.objectContaining({
        loading: false,
        producers: [],
      })
    );
  });

  it("should change the producers list when create is fulfilled", () => {
    const action = {
      type: createProducer.fulfilled.type,
      payload: { data: producerMock },
    };
    const initialState = {
      ...INITIAL_STATE,
      producers: [],
    };
    const state = ApplicationReducer(initialState, action);

    expect(generateChartsData).toHaveBeenCalledWith([producerMock]);

    expect(state).toEqual(
      expect.objectContaining({
        loading: false,
        producers: [producerMock],
        chartData: { chart: "mockChartData" },
      })
    );
  });

  it("should change loading to true when update is pending", () => {
    const action = { type: updateProducer.pending.type };
    const state = ApplicationReducer(undefined, action);
    expect(state).toEqual(
      expect.objectContaining({
        loading: true,
        producers: [],
      })
    );
  });

  it("should not change the producers list when update is rejected", () => {
    const action = { type: updateProducer.rejected.type };
    const state = ApplicationReducer(undefined, action);
    expect(state).toEqual(
      expect.objectContaining({
        loading: false,
        producers: [],
      })
    );
  });

  it("should change the producers list when update is fulfilled", () => {
    const initialState = {
      ...INITIAL_STATE,
      producers: [producerMock],
    };
    const action = {
      type: updateProducer.fulfilled.type,
      payload: updatedProducerMock,
    };

    const state = ApplicationReducer(initialState, action);

    expect(generateChartsData).toHaveBeenCalledWith([updatedProducerMock]);

    expect(state).toEqual(
      expect.objectContaining({
        loading: false,
        producers: [updatedProducerMock],
        chartData: { chart: "mockChartData" },
      })
    );
  });

  it("should change loading to true when delete is pending", () => {
    const action = { type: deleteProducer.pending.type };
    const state = ApplicationReducer(undefined, action);
    expect(state).toEqual(
      expect.objectContaining({
        loading: true,
        producers: [],
      })
    );
  });

  it("should not change the producers list when delete is rejected", () => {
    const action = { type: deleteProducer.rejected.type };
    const state = ApplicationReducer(undefined, action);
    expect(state).toEqual(
      expect.objectContaining({
        loading: false,
        producers: [],
      })
    );
  });

  it("should remove the producer and update chartData when deleteProducer is fulfilled", () => {
    const initialState = {
      ...INITIAL_STATE,
      producers: [producerMock, producerMock2],
      loading: true,
    };

    const action = {
      type: deleteProducer.fulfilled.type,
      payload: { id: producerMock.id },
    };

    const state = ApplicationReducer(initialState, action);

    expect(generateChartsData).toHaveBeenCalledWith([producerMock2]);

    expect(state).toEqual(
      expect.objectContaining({
        loading: false,
        producers: [producerMock2],
        chartData: { chart: "mockChartData" },
      })
    );
  });

  it("should change menu state when use toggleMenu", () => {
    const state = ApplicationReducer(INITIAL_STATE, {
      type: toggleMenu.type,
    });

    expect(state).toEqual(
      expect.objectContaining({
        showMenu: true,
      })
    );
  });

  it("should change formModal show state to true when use openForm without id", () => {
    const state = ApplicationReducer(INITIAL_STATE, {
      type: openForm.type,
    });

    expect(state).toEqual(
      expect.objectContaining({
        formModal: {
          id: "",
          show: true,
        },
      })
    );
  });

  it("should change formModal show state to true when use openForm with id", () => {
    const state = ApplicationReducer(INITIAL_STATE, {
      type: openForm.type,
      payload: "123",
    });

    expect(state).toEqual(
      expect.objectContaining({
        formModal: {
          id: "123",
          show: true,
        },
      })
    );
  });

  it("should change formModal show state to false and remove id when use closeForm", () => {
    const modifyState = {
      ...INITIAL_STATE,
      formModal: {
        id: "123",
        show: true,
      },
    };
    const state = ApplicationReducer(modifyState, {
      type: closeForm.type,
    });

    expect(state).toEqual(
      expect.objectContaining({
        formModal: {
          id: "",
          show: false,
        },
      })
    );
  });

  it("should change deleteModal show state to true when use openDeleteModal", () => {
    const state = ApplicationReducer(INITIAL_STATE, {
      type: openDeleteModal.type,
      payload: "123",
    });

    expect(state).toEqual(
      expect.objectContaining({
        deleteModal: {
          id: "123",
          show: true,
        },
      })
    );
  });

  it("should change deleteModal show state to false and remove id when use closeDeleteModal", () => {
    const modifyState = {
      ...INITIAL_STATE,
      deleteModal: {
        id: "123",
        show: true,
      },
    };
    const state = ApplicationReducer(modifyState, {
      type: closeDeleteModal.type,
    });

    expect(state).toEqual(
      expect.objectContaining({
        deleteModal: {
          id: "",
          show: false,
        },
      })
    );
  });
});
