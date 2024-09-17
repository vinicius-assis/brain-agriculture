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
  totalArea: string;
  cultivableArea: string;
  vegetationArea: string;
  crops: string;
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
