"use client";
import Table from "../components/Table";
import Menu from "../components/Menu";
import FarmForm from "../components/FarmForm";
import { TABLE_HEADERS_DATA } from "../components/Table/data";
import Typography from "../components/Typography";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  closeForm,
  fetchProducers,
  openForm,
} from "../../../store/reducers/actions";
import {
  getFormState,
  getLoadingState,
  getProducers,
} from "../../../store/reducers/selectors";
import { useEffect } from "react";
import { AppDispatch } from "../../../store";
import Loader from "../components/Loader";
import EmptyMessage from "../components/EmptyMessage";

export default function Profiles() {
  const dispatch = useDispatch<AppDispatch>();
  const formState = useSelector(getFormState);
  const producersData = useSelector(getProducers);
  const loading = useSelector(getLoadingState);
  const handleCloseForm = () => dispatch(closeForm());

  const getRows = () =>
    producersData?.map(({ document, name, farmName, id }) => ({
      name,
      document,
      farmname: farmName,
      id,
    }));

  const rows = getRows();

  useEffect(() => {
    dispatch(fetchProducers());
  }, [dispatch]);

  return (
    <div className="p-8 h-[calc(100vh-104px)] overflow-hidden md:pl-0 md:flex">
      <Menu />
      <FarmForm show={formState.show} onClose={handleCloseForm} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {!producersData?.length ? (
            <EmptyMessage />
          ) : (
            <div className="w-full">
              <div className="flex items-center justify-between">
                <Typography className="md:text-huge text-base-semi">
                  Profiles
                </Typography>
                <Button
                  className="md:hidden"
                  variant="sm"
                  onClick={() => dispatch(openForm())}
                >
                  + Add
                </Button>
              </div>
              <div className="w-full flex gap-6 mt-9 overflow-auto">
                <Table headers={TABLE_HEADERS_DATA} rows={rows} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
