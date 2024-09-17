import React from "react";
import Typography from "../Typography";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { openDeleteModal, openForm } from "../../../../store/reducers/actions";

interface ITableProps {
  headers: Array<string>;
  rows: Array<Record<string, string | number | string[] | undefined>>;
}

const Table = ({ headers, rows }: ITableProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteItem = (id: string) => dispatch(openDeleteModal(id));
  const handleEditItem = (id: string) => dispatch(openForm(id));

  return (
    <div className="relative flex flex-col w-full h-full text-dark-green bg-white shadow-md rounded-lg bg-clip-border overflow-auto">
      <table className="w-full text-left table-auto min-w-max overflow-auto">
        <thead>
          <tr>
            {headers.map((item, index) => (
              <th
                key={item}
                className={`p-4 border-b border-slate-200 bg-light-green ${
                  index === 0 ? "rounded-tl-lg" : ""
                }`}
              >
                <Typography className="text-sm font-normal leading-none">
                  {item}
                </Typography>
              </th>
            ))}

            <th className="p-4 border-b border-slate-200 bg-light-green">
              <span className="sr-only">Edit</span>
            </th>
            <th className="p-4 border-b border-slate-200 bg-light-green rounded-tr-lg">
              <span className="sr-only">Remove</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr
                key={index}
                className="hover:bg-slate-50 border-b border-slate-200 cursor-pointer"
              >
                {headers.map((header) => {
                  const itemKey = header.toLowerCase().replace(" ", "");
                  return (
                    <td key={header} className="p-4 py-5">
                      <Typography className="text-sm text-slate-500">
                        {row[itemKey]}
                      </Typography>
                    </td>
                  );
                })}
                <td className="p-4 py-5">
                  <a
                    onClick={
                      (row.id as string)
                        ? () => handleEditItem(row.id as string)
                        : undefined
                    }
                    className="text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </a>
                </td>
                <td className="p-4 py-5">
                  <a
                    onClick={
                      (row.id as string)
                        ? () => handleDeleteItem(row.id as string)
                        : undefined
                    }
                    className="text-sm text-red-000 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
