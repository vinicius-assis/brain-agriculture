import { ProducerService } from "./service";
import { producerMock } from "./mocks";

beforeEach(() => {
  global.fetch = jest.fn();
});

describe("#Producer Service Suite", () => {
  it("should create a producer and return the response data", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: () =>
        Promise.resolve({ message: "Producer created", data: producerMock }),
    } as Response);

    const response = await ProducerService.createProducer(producerMock);
    expect(response).toEqual({
      message: "Producer created",
      data: producerMock,
    });
    expect(global.fetch).toHaveBeenCalledWith("/api/producer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producerMock),
    });
  });

  it("should handle errors when creating a producer", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

    const response = await ProducerService.createProducer(producerMock);
    expect(response).toEqual({ error: new Error("Network Error") });
  });

  it("should return a list of producers", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: () => Promise.resolve([producerMock]),
    } as Response);

    const response = await ProducerService.fetchProducers();
    expect(response).toEqual([producerMock]);
    expect(global.fetch).toHaveBeenCalledWith("/api/producer", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  it("should handle errors when fetching producers", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

    const response = await ProducerService.fetchProducers();
    expect(response).toEqual({ error: new Error("Network Error") });
  });

  it("should delete a producer and return success message", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: () =>
        Promise.resolve({ message: "Producer deleted", data: producerMock.id }),
    } as Response);

    const response = await ProducerService.deleteProducers(producerMock.id);
    expect(response).toEqual({
      message: "Producer deleted",
      data: producerMock.id,
    });
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/producer/${producerMock.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: producerMock.id }),
      }
    );
  });

  it("should handle errors when deleting a producer", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

    const response = await ProducerService.deleteProducers(producerMock.id);
    expect(response).toEqual({ error: new Error("Network Error") });
  });

  it("should update a producer and return the updated data", async () => {
    const updatedProducer = { ...producerMock, name: "Updated Name" };

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: () =>
        Promise.resolve({ message: "Producer updated", data: updatedProducer }),
    } as Response);

    const response = await ProducerService.updateProducer(producerMock.id, {
      name: "Updated Name",
    });
    expect(response).toEqual({
      message: "Producer updated",
      data: updatedProducer,
    });
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/producer/${producerMock.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: producerMock.id, name: "Updated Name" }),
      }
    );
  });

  it("should handle errors when updating a producer", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

    const response = await ProducerService.updateProducer(producerMock.id, {
      name: "Updated Name",
    });
    expect(response).toEqual({ error: new Error("Network Error") });
  });
});
