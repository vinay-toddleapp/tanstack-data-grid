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
    if (isSelected) {
      setIsEditing(true);
      table.options.meta?.clearSelectionOnEdit();
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
      table.options.meta?.startSelection(row.index, column.id);
    }
  };

  const handleMouseEnter = (event) => {
    if (event.buttons === 1) {
      table.options.meta?.updateSelection(row.index, column.id);
      table.options.meta?.setSelectionEndCell({
        rowIndex: row.index,
        columnId: column.getIndex(),
      });
    }
  };

  const handleMouseUp = () => {
    table.options.meta?.endSelection();
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
          } select-none`}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseUp={handleMouseUp}
        >
          {value}
        </div>
      )}
    </>
  );
};

export default Cell;
