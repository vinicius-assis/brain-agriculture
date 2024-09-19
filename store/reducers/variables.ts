import { ChartsData, Producer } from "../../interfaces/application";

interface ApplicationState {
  producers: Producer[];
  showMenu: boolean;
  loading: boolean;
  formModal: {
    show: boolean;
    id: string | undefined;
  };
  deleteModal: {
    show: boolean;
    id: string | undefined;
  };
  chartData: ChartsData | undefined;
}

export const INITIAL_STATE: ApplicationState = {
  producers: [],
  showMenu: false,
  loading: true,
  formModal: {
    show: false,
    id: "",
  },
  deleteModal: {
    show: false,
    id: "",
  },
  chartData: undefined,
};
