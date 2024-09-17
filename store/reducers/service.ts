import { Producer } from "../../interfaces/application";

const createProducer = async (data: Producer) => {
  try {
    const response = await fetch("/api/producer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = response.json();

    return json;
  } catch (error) {
    return { error };
  }
};

const fetchProducers = async () => {
  try {
    const response = await fetch("/api/producer", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = response.json();

    return json;
  } catch (error) {
    return { error };
  }
};

const deleteProducers = async (id: string) => {
  try {
    const response = await fetch(`/api/producer/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const json = response.json();

    return json;
  } catch (error) {
    return { error };
  }
};

const updateProducer = async (id: string, data: Partial<Producer>) => {
  try {
    const response = await fetch(`/api/producer/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...data }),
    });
    const json = response.json();

    return json;
  } catch (error) {
    return { error };
  }
};

export const ProducerService = {
  createProducer,
  fetchProducers,
  deleteProducers,
  updateProducer,
};
