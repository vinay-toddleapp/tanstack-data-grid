export const isWithinSelection = (rowIndex, columnId, startCell, endCell) => {
  if (!startCell || !endCell) return false;
  const minRow = Math.min(startCell.rowIndex, endCell.rowIndex);
  const maxRow = Math.max(startCell.rowIndex, endCell.rowIndex);
  const minCol = Math.min(startCell.columnId, endCell.columnId);
  const maxCol = Math.max(startCell.columnId, endCell.columnId);
  return (
    rowIndex >= minRow &&
    rowIndex <= maxRow &&
    columnId >= minCol &&
    columnId <= maxCol
  );
};
