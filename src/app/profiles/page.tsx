"use client";
import Table from "../components/Table";
import Menu from "../components/Menu";
import FarmForm from "../components/FarmForm";
import { PROFILES_DATA, TABLE_HEADERS_DATA } from "../components/Table/data";
import Typography from "../components/Typography";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../../store/reducers/actions";
import { getFormState } from "../../../store/reducers/selectors";

export default function Profiles() {
  const dispatch = useDispatch();
  const showForm = useSelector(getFormState);
  const handleCloseForm = () => dispatch(toggleForm());

  return (
    <div className="p-8 h-[calc(100vh-104px)] overflow-hidden">
      <Menu />
      <FarmForm show={showForm} onClose={handleCloseForm} />
      <div className="flex items-center justify-between">
        <Typography className="text-base-semi">Profiles</Typography>
        <Button variant="sm" onClick={() => dispatch(toggleForm())}>
          + Add
        </Button>
      </div>
      <div className="w-full flex gap-6 mt-9 overflow-auto">
        <Table headers={TABLE_HEADERS_DATA} rows={PROFILES_DATA} />
      </div>
    </div>
  );
}
