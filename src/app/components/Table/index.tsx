import React from "react";
import Typography from "../Typography";

interface ITableProps {
  headers: Array<string>;
  rows: { [key: string]: string }[];
}

const Table = ({ headers, rows }: ITableProps) => {
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

            <th className="p-4 border-b border-slate-200 bg-light-green rounded-tr-lg">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-slate-50 border-b border-slate-200 cursor-pointer"
            >
              {headers.map((header) => {
                const itemKey = header.toLowerCase().replace(" ", "");
                if (index === 0) console.log(itemKey, row, row[itemKey]);
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
