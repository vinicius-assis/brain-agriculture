"use client";
import { useDispatch, useSelector } from "react-redux";
import Button from "./components/Button";
import ChartCard from "./components/ChartCard";
import Menu from "./components/Menu";
import TotalCard from "./components/TotalCard";
import { fetchProducers, toggleForm } from "../../store/reducers/actions";
import FarmForm from "./components/FarmForm";
import {
  getFormState,
  getLoadingState,
  getProducers,
} from "../../store/reducers/selectors";
import { useEffect } from "react";
import { AppDispatch } from "../../store";
import Typography from "./components/Typography";
import Loader from "./components/Loader";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const showForm = useSelector(getFormState);
  const loading = useSelector(getLoadingState);
  const producersData = useSelector(getProducers);
  const handleCloseForm = () => dispatch(toggleForm());

  useEffect(() => {
    dispatch(fetchProducers());
  }, []);

  return (
    <div className="p-8 h-[calc(100vh-104px)] overflow-auto md:pl-0 md:flex">
      <Menu />
      <FarmForm show={showForm} onClose={handleCloseForm} />
      <Button
        onClick={() => dispatch(toggleForm())}
        className="mx-auto md:hidden"
      >
        + New Profile
      </Button>
      <div className="w-full">
        {loading ? (
          <Loader />
        ) : (
          <>
            {!producersData?.length ? (
              <Typography>No data found</Typography>
            ) : (
              <>
                <div className="w-full flex gap-6 mt-9 overflow-auto pb-2">
                  <TotalCard title="Total Profiles" value="20" percent="20%" />
                  <TotalCard title="Total Farms" value="50" percent="14%" />
                  <TotalCard title="Total Area" value="50m2" percent="14%" />
                </div>
                <div className="flex md:flex-row flex-col gap-10 mt-10">
                  <ChartCard
                    title="Total Crops"
                    labels={[
                      "Soybean",
                      "Corn",
                      "Cotton",
                      "Coffee",
                      "Sugarcane",
                    ]}
                    series={[10, 20, 32, 40, 11]}
                  />
                  <ChartCard
                    title="Total Crops"
                    labels={[
                      "Soybean",
                      "Corn",
                      "Cotton",
                      "Coffee",
                      "Sugarcane",
                    ]}
                    series={[10, 20, 32, 40, 11]}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
