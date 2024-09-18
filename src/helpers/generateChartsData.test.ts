import generateChartsData from "./generateChartsData";
const mockData = [
  {
    document: "13314322222",
    name: "Teste1",
    farmName: "TestFarm",
    city: "Iguaba",
    state: "RJ",
    totalArea: 200,
    cultivableArea: 100,
    vegetationArea: 100,
    crops: ["Corn", "Sugarcane"],
  },
  {
    document: "13314322222",
    name: "Teste1",
    farmName: "TestFarm",
    city: "Iguaba",
    state: "SP",
    totalArea: 300,
    cultivableArea: 100,
    vegetationArea: 200,
    crops: ["Coffee", "Soybean"],
  },
];

const mockResponse = {
  totalFarms: 2,
  totalAreaSum: 500,
  totalCultivableAreaSum: 200,
  crops: {
    labels: ["Corn", "Sugarcane", "Coffee", "Soybean"],
    series: [100, 100, 100, 100],
  },
  cultivableAreaByState: {
    labels: ["RJ", "SP"],
    series: [100, 100],
  },
  vegetationAreaByState: {
    labels: ["RJ", "SP"],
    series: [100, 200],
  },
  totalCultivableAndVegetationArea: {
    labels: ["Cultivable", "Vegetation"],
    series: [200, 300],
  },
};

describe("#generateChartData Suite", () => {
  it("should return a empty object when receive a empty array as param", () => {
    const data = generateChartsData([]);
    expect(data).toEqual({});
  });

  it("should return chart data values correctly", () => {
    const data = generateChartsData(mockData);
    expect(data).toEqual(mockResponse);
  });
});
