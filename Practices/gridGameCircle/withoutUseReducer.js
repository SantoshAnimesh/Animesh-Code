

import { useState } from "react";

// Create empty grid
const createGrid = (rows, cols) =>
  Array.from({ length: rows }, () => Array(cols).fill(null));

function GridGame({ row = 6, col = 8 }) {
  const [grid, setGrid] = useState(() => createGrid(row, col));
  const [active, setActive] = useState({
    rowIndex: 0,
    colIndex: 0,
    color: null,
  });

  // ✅ History stack
  const [history, setHistory] = useState([]);

  const isGridFull = active.rowIndex === row - 1 && active.colIndex === col - 1;

  const getNextPosition = (btnColor) => {
    let { rowIndex, colIndex, color } = active;

    if (color === null) {
      return { rowIndex: 0, colIndex: 0, color: btnColor };
    }

    if (color !== btnColor && colIndex < col - 1) {
      return {
        rowIndex: 0,
        colIndex: colIndex + 1,
        color: btnColor,
      };
    }

    if (colIndex === col - 1 && color !== btnColor) {
      color = btnColor;
    }

    if (rowIndex < row - 1) {
      return {
        rowIndex: rowIndex + 1,
        colIndex,
        color,
      };
    }

    return {
      rowIndex: 0,
      colIndex: colIndex + 1,
      color,
    };
  };

  const updateGrid = (grid, { rowIndex, colIndex, color }) => {
    const newGrid = grid.map((row) => [...row]);
    newGrid[rowIndex][colIndex] = color;
    return newGrid;
  };

  const handleClick = (btnColor) => {
    if (isGridFull) return;

    // ✅ Save current state before updating
    setHistory((prev) => [
      ...prev,
      {
        grid,
        active,
      },
    ]);

    const next = getNextPosition(btnColor);

    setGrid((prev) => updateGrid(prev, next));
    setActive(next);
  };

  // ✅ Undo logic
  const handleUndo = () => {
    if (history.length === 0) return;

    const lastState = history[history.length - 1];

    setGrid(lastState.grid);
    setActive(lastState.active);

    // Remove last history entry
    setHistory((prev) => prev.slice(0, -1));
  };

  return (
    <div className="grid-wrapper">
      <h2>Grid Game</h2>

      <div
        className="grid-container"
        style={{
          gridTemplateColumns: `repeat(${col}, 60px)`,
          gridTemplateRows: `repeat(${row}, 60px)`,
        }}
      >
        {grid.map((rowItems, rIdx) =>
          rowItems.map((cell, cIdx) => (
            <div key={`${rIdx}-${cIdx}`} className="box">
              {cell !== null && (
                <span
                  className="circle"
                  style={{
                    border: `10px solid ${cell === 0 ? "red" : "green"}`,
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>

      <div className="btn-actions">
        <button onClick={() => handleClick(0)} disabled={isGridFull}>
          Red
        </button>
        <button onClick={() => handleClick(1)} disabled={isGridFull}>
          Green
        </button>

        {/* ✅ Undo Button */}
        <button onClick={handleUndo} disabled={history.length === 0}>
          Undo
        </button>
      </div>
    </div>
  );
}

export default GridGame;

