import React, { useEffect, useRef, useState } from "react";

const Cell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const isSelected =
    table.options.meta?.selectedCell?.rowIndex === row.index &&
    table.options.meta?.selectedCell?.columnId === column.getIndex();
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
        columnId: column.getIndex(),
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
        columnId: column.getIndex(),
      });
    }
  };

  const handleKeyDown = (event) => {
    const keyName = event.key;
    if (isSelected && keyName === "Enter") {
      setIsEditing(true);
    } else if (keyName === "ArrowRight") {
      moveRight();
    } else if (keyName === "ArrowLeft") {
      moveLeft();
    } else if (keyName === "ArrowDown") {
      moveDown();
    } else if (keyName === "ArrowUp") {
      moveUp();
    }
  };

  function moveRight() {
    const currentColumnIndex = table.options.meta.selectedCell.columnId;
    const totalColumns = table.getAllColumns().length;
    if (currentColumnIndex !== totalColumns - 1) {
      table.options.meta.setSelectedCell({
        rowIndex: row.index,
        columnId: currentColumnIndex + 1,
      });
    }
  }

  function moveLeft() {
    const currentColumnIndex = table.options.meta.selectedCell.columnId;
    if (currentColumnIndex !== 0) {
      table.options.meta.setSelectedCell({
        rowIndex: row.index,
        columnId: currentColumnIndex - 1,
      });
    }
  }

  function moveDown() {
    const currentRowIndex = row.index;
    const totalRows = table.getCoreRowModel().rows.length;
    if (currentRowIndex !== totalRows - 1) {
      table.options.meta.setSelectedCell({
        rowIndex: currentRowIndex + 1,
        columnId: table.options.meta.selectedCell.columnId,
      });
    }
  }

  function moveUp() {
    const currentRowIndex = row.index;
    if (currentRowIndex !== 0) {
      table.options.meta.setSelectedCell({
        rowIndex: currentRowIndex - 1,
        columnId: table.options.meta.selectedCell.columnId,
      });
    }
  }

  const handleInputKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsEditing(false);
      table.options.meta?.setSelectedCell({
        rowIndex: row.index,
        columnId: column.getIndex(),
      });
    }
    if (event.key === "Enter") {
      const nextRowIndex = row.index + 1;
      if (nextRowIndex < table.getRowModel().rows.length) {
        table.options.meta?.setSelectedCell({
          rowIndex: nextRowIndex,
          columnId: column.getIndex(),
        });
        setIsEditing(false);
        setTimeout(() => {
          const nextCell = document.querySelector(
            `[data-row-index="${nextRowIndex}"][data-column-id="${column.id}"]`
          );
          if (nextCell) {
            nextCell.focus();
          }
        }, 0);
      } else {
        setIsEditing(false);
      }
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
