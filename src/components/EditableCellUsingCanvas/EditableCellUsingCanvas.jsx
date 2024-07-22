import React, { useEffect, useRef, useState } from "react";
import { data } from "../../helper/data";

const EditableCellUsingCanvas = () => {
  const [tableData, setTableData] = useState(data);
  const canvasRef = useRef(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");

  const cellHeight = 30;
  const cellPadding = 10;
  const headers = ["First Name", "Last Name", "Age", "Sex"];
  const columns = ["firstName", "lastName", "age", "sex"];

  const renderGrid = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // rendering table header
    ctx.fillStyle = "#4A5568";
    ctx.fillRect(0, 0, ctx.canvas.width, cellHeight);

    ctx.fillStyle = "#FFF";
    ctx.font = "bold 16px Arial";

    headers.forEach((header, index) => {
      ctx.fillText(header, index * 150 + cellPadding, cellHeight / 2 + 8);
    });

    // rendering table body
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";

    tableData.forEach((row, rowIndex) => {
      const y = (rowIndex + 1) * cellHeight;

      columns.forEach((col, colIndex) => {
        const x = colIndex * 150 + cellPadding;
        ctx.fillText(row[col], x, y + cellHeight / 2 + 6);

        if (
          selectedCell &&
          selectedCell.row === rowIndex &&
          selectedCell.col === colIndex
        ) {
          ctx.strokeStyle = "blue";
          ctx.lineWidth = 2;
          ctx.strokeRect(colIndex * 150, y, 150, cellHeight);
        }
      });

      // row separator
      ctx.strokeStyle = "#E2E8F0";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
      ctx.stroke();
    });
  };

  const handleMouseDown = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rowIndex = Math.floor(y / cellHeight) - 1;
    const colIndex = Math.floor(x / 150);

    if (
      rowIndex >= 0 &&
      rowIndex < tableData.length &&
      colIndex >= 0 &&
      colIndex < columns.length
    ) {
      setSelectedCell({ row: rowIndex, col: colIndex });
      if (editingCell && editValue.length > 0) {
        const { row, col } = editingCell;
        const updatedData = [...tableData];
        updatedData[row][columns[col]] = editValue;
        setTableData(updatedData);
      }
      setEditingCell(null);
    }
  };

  const handleDoubleClick = () => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      setEditingCell(selectedCell);
      setEditValue(tableData[row][columns[col]]);
    }
  };

  const handleInputChange = (event) => {
    setEditValue(event.target.value);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = (tableData.length + 1) * cellHeight;

    renderGrid(ctx);
  }, [tableData, selectedCell]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="border rounded"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      />
      {editingCell && (
        <input
          type="text"
          value={editValue}
          onChange={handleInputChange}
          className="absolute"
          style={{
            top: (editingCell.row + 1) * cellHeight,
            left: editingCell.col * 150,
            width: 150,
            height: cellHeight,
            padding: cellPadding,
            border: "2px solid blue",
          }}
        />
      )}
    </div>
  );
};

export default EditableCellUsingCanvas;
