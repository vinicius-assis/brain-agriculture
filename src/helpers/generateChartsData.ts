import {
  ChartsData,
  CropSums,
  Producer,
  StateAreaSums,
} from "../../interfaces/application";

const generateChartsData = (data: Producer[]): ChartsData | undefined => {
  if (!data?.length) {
    return undefined;
  }
  const totalAreaSum = data.reduce((sum, farm) => sum + farm.totalArea, 0);
  const totalCultivableAreaSum = data.reduce(
    (sum, farm) => sum + farm.cultivableArea,
    0
  );

  const cropSums: CropSums = {};
  const stateCultivableAreaSums: StateAreaSums = {};
  const stateVegetationAreaSums: StateAreaSums = {};
  let totalCultivableArea = 0;
  let totalVegetationArea = 0;

  data.forEach((farm) => {
    farm.crops.forEach((crop) => {
      if (!cropSums[crop]) {
        cropSums[crop] = 0;
      }
      cropSums[crop] += farm.cultivableArea;
    });

    if (!stateCultivableAreaSums[farm.state]) {
      stateCultivableAreaSums[farm.state] = 0;
    }
    stateCultivableAreaSums[farm.state] += farm.cultivableArea;

    if (!stateVegetationAreaSums[farm.state]) {
      stateVegetationAreaSums[farm.state] = 0;
    }
    stateVegetationAreaSums[farm.state] += farm.vegetationArea;

    totalCultivableArea += farm.cultivableArea;
    totalVegetationArea += farm.vegetationArea;
  });

  const cropLabels = Object.keys(cropSums);
  const cropSeries = Object.values(cropSums);

  const stateCultivableLabels = Object.keys(stateCultivableAreaSums);
  const stateCultivableSeries = Object.values(stateCultivableAreaSums);

  const stateVegetationLabels = Object.keys(stateVegetationAreaSums);
  const stateVegetationSeries = Object.values(stateVegetationAreaSums);

  return {
    totalFarms: data.length,
    totalAreaSum,
    totalCultivableAreaSum,
    crops: {
      labels: cropLabels,
      series: cropSeries,
    },
    cultivableAreaByState: {
      labels: stateCultivableLabels,
      series: stateCultivableSeries,
    },
    vegetationAreaByState: {
      labels: stateVegetationLabels,
      series: stateVegetationSeries,
    },
    totalCultivableAndVegetationArea: {
      labels: ["Cultivable", "Vegetation"],
      series: [totalCultivableArea, totalVegetationArea],
    },
  };
};

export default generateChartsData;
