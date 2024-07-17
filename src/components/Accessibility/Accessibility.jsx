import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { data } from "../../helper/data";
import Cell from "./Cell";

const Accessibility = () => {
  const [tableData, setTableData] = useState(data);
  const [selectedCell, setSelectedCell] = useState(null);
  const columns = [
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: Cell,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: Cell,
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: Cell,
    },
    {
      accessorKey: "sex",
      header: "Sex",
      cell: Cell,
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
    <>
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
                    <td key={cell.id} className="border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="w-1/2 shadow-md p-5 space-y-5">
        <h1 className="text-lg font-medium text-center">
          Keys to test accessibility
        </h1>
        <div className="grid grid-cols-2 gap-5">
          <p>Tab</p>
          <p>Move to next horizontal cell</p>
          <p>Shift + Tab</p>
          <p>Move to previous horizontal cell</p>
          <p>Enter</p>
          <p>Move selected cell to next vertical cell</p>
          <p>Shift + Enter</p>
          <p>Move selected cell to previous vertical cell</p>
          <p>Enter (Selected Cell)</p>
          <p>Selected state cell to editable state Cell</p>
          <p>Escape</p>
          <p>Editable state cell to normal state cell</p>
        </div>
      </div>
    </>
  );
};

export default Accessibility;
