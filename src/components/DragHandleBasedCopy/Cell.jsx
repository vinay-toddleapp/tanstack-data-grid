import React, { useEffect, useState } from "react";
import { isWithinSelection } from "../../helper/common";

const Cell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const startCell = table.options.meta?.selectionStartCell;
  const endCell = table.options.meta?.selectionEndCell;

  const isSelected = isWithinSelection(
    row.index,
    column.getIndex(),
    startCell,
    endCell
  );

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
    setIsEditing(false);
  };

  const handleMouseDown = (event) => {
    if (event.target !== event.currentTarget) return;
    if (isSelected) {
      setIsEditing(true);
      table.options.meta?.setSelectionStartCell(null);
      table.options.meta?.setSelectionEndCell(null);
      return;
    }
    if (event.button === 0) {
      table.options.meta?.setSelectionStartCell({
        rowIndex: row.index,
        columnId: column.getIndex(),
      });
      table.options.meta?.setSelectionEndCell({
        rowIndex: row.index,
        columnId: column.getIndex(),
      });
    }
  };

  const handleMouseEnter = (event) => {
    if (event.buttons === 1) {
      table.options.meta?.setSelectionEndCell({
        rowIndex: row.index,
        columnId: column.getIndex(),
      });
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <>
      {isEditing ? (
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={onBlur}
          className="bg-transparent w-full"
        />
      ) : (
        <div
          className={`${
            isSelected ? "border border-blue-500" : ""
          } select-none relative`}
          data-cell={`{"rowIndex": ${
            row.index
          }, "columnId": ${column.getIndex()}}`}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
        >
          {value}

          {isSelected && (
            <span className="absolute -bottom-2 -right-1 h-3 w-3 bg-red-500 rounded-full cursor-pointer z-50" />
          )}
        </div>
      )}
    </>
  );
};

export default Cell;
