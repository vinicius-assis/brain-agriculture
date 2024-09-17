"use client";
import Table from "../components/Table";
import Menu from "../components/Menu";
import FarmForm from "../components/FarmForm";
import { FARM_TABLE_HEADERS } from "../components/Table/data";
import Typography from "../components/Typography";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../../store/reducers/actions";
import { getFormState, getProducers } from "../../../store/reducers/selectors";

export default function Farms() {
  const dispatch = useDispatch();
  const showForm = useSelector(getFormState);
  const producersData = useSelector(getProducers);
  const handleCloseForm = () => dispatch(toggleForm());

  const getRows = () =>
    producersData?.map(
      ({
        farmName,
        city,
        state,
        totalArea,
        cultivableArea,
        vegetationArea,
        crops,
      }) => {
        const row = {
          farmName,
          location: `${city}-${state}`,
          totalArea,
          cultivableArea,
          vegetationArea,
          crops: crops,
        };

        return Object.fromEntries(
          Object.entries(row).map(([key, value]) => [key.toLowerCase(), value])
        );
      }
    );
  const rows = getRows();

  return (
    <div className="p-8 h-[calc(100vh-104px)] overflow-hidden md:pl-0 md:flex">
      <Menu />
      <FarmForm show={showForm} onClose={handleCloseForm} />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <Typography className="md:text-huge text-base-semi">Farms</Typography>
          <Button
            className="md:hidden"
            variant="sm"
            onClick={() => dispatch(toggleForm())}
          >
            + Add
          </Button>
        </div>
        <div className="w-full flex gap-6 mt-9 overflow-auto">
          <Table headers={FARM_TABLE_HEADERS} rows={rows} />
        </div>
      </div>
    </div>
  );
}
