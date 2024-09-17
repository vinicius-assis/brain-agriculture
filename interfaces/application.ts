export type GetProducerResponse = Producer[];

export interface PostProducerResponse {
  message: string;
  data: Producer;
}

export interface DeleteProducerResponse {
  message: string;
  id: string;
}

export interface Producer {
  id?: string;
  document: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  cultivableArea: number;
  vegetationArea: number;
  crops: Array<string>;
  created_at?: string;
  updated_at?: string;
}

export interface Farm {
  name: string;
  city: string;
  state: string;
  totalArea: string;
  cultivableArea: string;
  vegetationArea: string;
  crops: string;
}

export interface CropSums {
  [key: string]: number;
}

export interface StateAreaSums {
  [key: string]: number;
}

export interface ChartsData {
  totalFarms: number;
  totalAreaSum: number;
  totalCultivableAreaSum: number;
  crops: {
    labels: string[];
    series: number[];
  };
  cultivableAreaByState: {
    labels: string[];
    series: number[];
  };
  vegetationAreaByState: {
    labels: string[];
    series: number[];
  };
  totalCultivableAndVegetationArea: {
    labels: string[];
    series: number[];
  };
}
