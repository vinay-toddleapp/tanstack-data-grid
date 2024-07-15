import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { data } from "../helper/data";

const BasicTable = () => {
  const [tableData, setTableData] = useState(data);
  const columns = [
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "sex",
      header: "Sex",
      cell: (props) => <p>{props.getValue()}</p>,
    },
  ];
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="table-auto border-collapse w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className="border px-4 py-2 bg-gray-100 text-left"
                  >
                    {header.column.columnDef.header}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody>
        {table.getCoreRowModel().rows.map((row) => {
          return (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              {row.getAllCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BasicTable;
