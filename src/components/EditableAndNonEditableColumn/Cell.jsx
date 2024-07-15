import React, { useEffect, useState } from "react";

const Cell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const isSelected =
    table.options.meta?.selectedCell?.rowIndex === row.index &&
    table.options.meta?.selectedCell?.columnId === column.id;

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  const handleClick = () => {
    if (isSelected) {
      setIsEditing(true);
    } else {
      table.options.meta?.setSelectedCell({
        rowIndex: row.index,
        columnId: column.id,
      });
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div
      onClick={handleClick}
      className={isSelected ? "border border-blue-500" : ""}
    >
      {isEditing ? (
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={onBlur}
          className="bg-transparent w-full"
        />
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
};

export default Cell;
