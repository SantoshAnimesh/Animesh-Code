size: Size of grid Boxes by ROW/Columns
disabledIndices: paases box of inces which box we not want to clikable/Show in ui

// ---------- Code -------------
import React, { useState, useEffect, useMemo } from "react";
// import "./GridLight.css";
// Helpers
const createInitialGrid = (size) =>
  Array.from({ length: size * size }, () => false);

const GridLight = ({ size = 5, disabledIndices = [] }) => {
  const [grid, setGrid] = useState(() => createInitialGrid(size));
  const [clickOrder, setClickOrder] = useState([]);
  const [discolorMode, setDiscolorMode] = useState(false);

  // Convert disabledIndices → Set (O(1) lookup)
  const disabledSet = useMemo(
    () => new Set(disabledIndices),
    [disabledIndices]
  );

  const totalActiveCells = size * size - disabledSet.size;

  // Count active cells (derived state)
  const activeCount = useMemo(() => {
    return grid.reduce(
      (count, val, idx) => (!disabledSet.has(idx) && val ? count + 1 : count),
      0
    );
  }, [grid, disabledSet]);

  const allActiveOn = activeCount === totalActiveCells;

  // Handle click
  const handleCellClick = (idx, cell) => {
    if (disabledSet.has(idx) || discolorMode || cell) return;

    setGrid((prev) => {
      const newGrid = [...prev];
      newGrid[idx] = !newGrid[idx];
      return newGrid;
    });

    setClickOrder((prev) =>
      grid[idx] ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Discolor effect
  useEffect(() => {
    if (!discolorMode && allActiveOn) {
      setDiscolorMode(true);
      return;
    }

    if (!discolorMode) return;
    if (clickOrder.length === 0) {
      setDiscolorMode(false);
      return;
    }

    const timer = setTimeout(() => {
      const idx = clickOrder[0];

      setGrid((prev) => {
        const newGrid = [...prev];
        newGrid[idx] = false;
        return newGrid;
      });

      setClickOrder((prev) => prev.slice(1));
    }, 400);

    return () => clearTimeout(timer);
  }, [allActiveOn, discolorMode, clickOrder]);

  const resetGrid = () => {
    setGrid(createInitialGrid(size));
    setClickOrder([]);
    setDiscolorMode(false);
  };

  return (
    <div className="gridlight-container">
      <h2>GridLight</h2>

      <div
        className="gridlight-grid"
        style={{ gridTemplateColumns: `repeat(${size},1fr)` }}
      >
        {grid.map((cell, idx) => {
          const disabled = disabledSet.has(idx);
          console.log(cell);

          return (
            <div
              key={idx}
              className={`gridlight-cell ${cell ? "on" : ""} ${
                disabled ? "disabled" : ""
              }`}
              onClick={() => handleCellClick(idx, cell)}
            />
          );
        })}
      </div>

      <button className="gridlight-reset" onClick={resetGrid}>
        Reset
      </button>
    </div>
  );
};

// ---------GridLight.css------------------>>
.gridlight-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  font-family: sans-serif;
}

.gridlight-grid {
  display: grid;
  width: 500px;
  height: 500px;
  gap: 12px;
  margin-bottom: 1rem;
}

.gridlight-row {
  display: flex;
  gap: 4px;
}

.gridlight-cell {
  width: 100%;
  height: 100%;
  background: #eee;
  border: 1px solid #bbb;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.gridlight-cell.on {
  background: #ffe066;
  box-shadow: 0 0 8px #ffe066;
}

.gridlight-cell.disabled {
  background: none;
  border: none;
  cursor: not-allowed;
  opacity: 0.5;
  box-shadow: none;
}

.gridlight-reset {
  padding: 0.5rem 1.5rem;
  border: none;
  background: #333;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.gridlight-reset:hover {
  background: #555;
}



export default GridLight;
