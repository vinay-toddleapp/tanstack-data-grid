import React, { useEffect, useRef, useState } from "react";

const Cell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const isSelected =
    table.options.meta?.selectedCell?.rowIndex === row.index &&
    table.options.meta?.selectedCell?.columnId === column.id;
  const divRef = useRef(null);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
    table.options.meta?.setSelectedCell(null);
    setIsEditing(false);
  };

  const handleClick = (event) => {
    if (isSelected) {
      event.target.focus();
    } else {
      table.options.meta?.setSelectedCell({
        rowIndex: row.index,
        columnId: column.id,
      });
    }
  };

  const handleDoubleClick = () => {
    if (isSelected) {
      setIsEditing(true);
    }
  };

  const handleFocus = () => {
    if (!isSelected) {
      table.options.meta?.setSelectedCell({
        rowIndex: row.index,
        columnId: column.id,
      });
    }
  };

  const handleKeyDown = (event) => {
    if (isSelected && event.key === "Enter") {
      setIsEditing(true);
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsEditing(false);
      table.options.meta?.setSelectedCell({
        rowIndex: row.index,
        columnId: column.id,
      });
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!isEditing && isSelected && divRef.current) {
      divRef.current.focus();
    }
  }, [isEditing, isSelected]);

  return (
    <>
      {isEditing ? (
        <input
          tabIndex={isEditing ? 0 : -1}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={onBlur}
          autoFocus={isEditing}
          onKeyDown={handleInputKeyDown}
          className="bg-transparent w-full"
        />
      ) : (
        <div
          ref={divRef}
          tabIndex={0}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {value}
        </div>
      )}
    </>
  );
};

export default Cell;
