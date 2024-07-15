import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { data } from "../../helper/data";
import Cell from "./Cell";

const EditableAndNonEditableColumn = () => {
  const [tableData, setTableData] = useState(data);
  const [selectedCell, setSelectedCell] = useState(null);
  const columns = [
    {
      accessorKey: "firstName",
      header: "First Name (Editable)",
      cell: Cell,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "age",
      header: "Age (Editable)",
      cell: Cell,
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
    meta: {
      updateData: (rowIndex, columnKey, newValue) => {
        setTableData((prev) =>
          prev.map((row, index) =>
            rowIndex === index
              ? {
                  ...prev[rowIndex],
                  [columnKey]: newValue,
                }
              : row
          )
        );
      },
      selectedCell,
      setSelectedCell,
    },
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
                  <td key={cell.id} className="border px-4 py-2">
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

export default EditableAndNonEditableColumn;
