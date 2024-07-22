import React, { useEffect, useRef } from "react";
import { data } from "../../helper/data";

const BasicTableUsingCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cellHeight = 30;
    const cellPadding = 10;

    const headers = ["First Name", "Last Name", "Age", "Sex"];
    const columns = ["firstName", "lastName", "age", "sex"];

    canvas.width = 600;
    canvas.height = (data.length + 1) * cellHeight;

    ctx.fillStyle = "#4A5568";
    ctx.fillRect(0, 0, canvas.width, cellHeight);

    ctx.fillStyle = "#FFF";
    ctx.font = "bold 16px Arial";

    headers.forEach((header, index) => {
      ctx.fillText(header, index * 150 + cellPadding, cellHeight / 2 + 8);
    });

    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";

    data.forEach((row, rowIndex) => {
      const y = (rowIndex + 1) * cellHeight;

      columns.forEach((col, colIndex) => {
        const x = colIndex * 150 + cellPadding;
        ctx.fillText(row[col], x, y + cellHeight / 2 + 6);
      });

      // row separator
      ctx.strokeStyle = "#E2E8F0";
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    });
  }, []);

  return <canvas ref={canvasRef} className="border rounded" />;
};

export default BasicTableUsingCanvas;
