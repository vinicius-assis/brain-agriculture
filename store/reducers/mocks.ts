export const createProducerMock = {
  document: "13444422211",
  name: "New Item",
  farmName: "New Farm",
  city: "New City",
  state: "RJ",
  totalArea: 200,
  cultivableArea: 100,
  vegetationArea: 100,
  crops: ["Corn", "Sugarcane"],
};

export const producerMock = {
  document: "13314322222",
  name: "Teste1",
  farmName: "TestFarm",
  city: "Iguaba",
  state: "RJ",
  totalArea: 200,
  cultivableArea: 100,
  vegetationArea: 100,
  crops: ["Corn", "Sugarcane"],
  id: "123321",
};

export const producerMock2 = {
  id: "43321",
  document: "14321432222",
  name: "Producer2",
  farmName: "Farm2",
  city: "Campos",
  state: "RJ",
  totalArea: 300,
  cultivableArea: 200,
  vegetationArea: 100,
  crops: ["Soybeans", "Wheat"],
};

export const updatedProducerMock = {
  ...producerMock,
  name: "Updated Producer",
  crops: ["Corn", "Soybeans"],
};
