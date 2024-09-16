import React from "react";
import Typography from "../Typography";

interface ITableProps {
  items: Array<string>;
  rows: { [key: string]: string }[];
}

const Table = ({ items, rows }: ITableProps) => {
  return (
    <div className="relative flex flex-col w-full h-full text-dark-green bg-white shadow-md rounded-lg bg-clip-border">
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            {items.map((item, index) => (
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

            <th className="p-4 border-b border-slate-200 bg-light-green rounded-tr-lg">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ document, name, farmName }) => (
            <tr
              key={document}
              className="hover:bg-slate-50 border-b border-slate-200 cursor-pointer"
            >
              <td className="p-4 py-5">
                <Typography className="block font-semibold text-sm text-slate-800">
                  {name}
                </Typography>
              </td>
              <td className="p-4 py-5">
                <Typography className="text-sm text-slate-500">
                  {document}
                </Typography>
              </td>
              <td className="p-4 py-5">
                <Typography className="text-sm text-slate-500">
                  {farmName}
                </Typography>
              </td>
              <td className="p-4 py-5">
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
