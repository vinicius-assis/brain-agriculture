"use client";
import { useDispatch, useSelector } from "react-redux";
import Button from "./components/Button";
import Menu from "./components/Menu";
import {
  closeForm,
  fetchProducers,
  openForm,
} from "../../store/reducers/actions";
import FarmForm from "./components/FarmForm";
import {
  getFormState,
  getLoadingState,
  getProducers,
} from "../../store/reducers/selectors";
import { useEffect } from "react";
import { AppDispatch } from "../../store";
import Loader from "./components/Loader";
import EmptyMessage from "./components/EmptyMessage";
import ChartSection from "./components/ChartSection";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const showForm = useSelector(getFormState);
  const loading = useSelector(getLoadingState);
  const producersData = useSelector(getProducers);
  const handleCloseForm = () => dispatch(closeForm());

  useEffect(() => {
    dispatch(fetchProducers());
  }, []);

  return (
    <div className="p-8 h-[calc(100vh-104px)] overflow-auto md:pl-0 md:flex">
      <Menu />
      <FarmForm show={showForm.show} onClose={handleCloseForm} />
      <Button
        onClick={() => dispatch(openForm())}
        className="mx-auto md:hidden"
      >
        + New Profile
      </Button>
      {loading ? (
        <Loader />
      ) : (
        <>{!producersData?.length ? <EmptyMessage /> : <ChartSection />}</>
      )}
    </div>
  );
}
