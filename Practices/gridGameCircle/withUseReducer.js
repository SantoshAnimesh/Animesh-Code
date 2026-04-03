

import { useReducer } from "react";

// Create empty grid
const createGrid = (rows, cols) =>
  Array.from({ length: rows }, () => Array(cols).fill(null));

// Initial state factory
const createInitialState = (rows, cols) => ({
  grid: createGrid(rows, cols),
  active: {
    rowIndex: 0,
    colIndex: 0,
    color: null,
  },
  history: [],
  rows,
  cols,
});

// Get next position
const getNextPosition = (btnColor, active, rows, cols) => {
  let { rowIndex, colIndex, color } = active;

  if (color === null) {
    return { rowIndex: 0, colIndex: 0, color: btnColor };
  }

  if (color !== btnColor) {
    return {
      rowIndex: 0,
      colIndex: colIndex + 1,
      color: btnColor,
    };
  }

  if (rowIndex < rows - 1) {
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

// Update grid
const updateGrid = (grid, { rowIndex, colIndex, color }) => {
  const newGrid = grid.map((row) => [...row]);
  newGrid[rowIndex][colIndex] = color;
  return newGrid;
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "MOVE": {
      const { btnColor } = action.payload;
      const { grid, active, history, rows, cols } = state;

      const isGridFull =
        active.rowIndex === rows - 1 && active.colIndex === cols - 1;

      if (isGridFull) return state;

      const next = getNextPosition(btnColor, active, rows, cols);

      return {
        ...state,
        grid: updateGrid(grid, next),
        active: next,
        history: [
          ...history,
          {
            grid: grid.map((row) => [...row]), // deep copy
            active: { ...active },
          },
        ],
      };
    }

    case "UNDO": {
      const { history } = state;

      if (history.length === 0) return state;

      const last = history[history.length - 1];

      return {
        ...state,
        grid: last.grid,
        active: last.active,
        history: history.slice(0, -1),
      };
    }

    default:
      return state;
  }
};

function GridGame({ row = 6, col = 8 }) {
  const [state, dispatch] = useReducer(reducer, createInitialState(row, col));

  const { grid, active, history, rows, cols } = state;

  const isGridFull =
    active.rowIndex === rows - 1 && active.colIndex === cols - 1;

  return (
    <div className="grid-wrapper">
      <h2>Grid Game (useReducer)</h2>

      <div
        className="grid-container"
        style={{
          gridTemplateColumns: `repeat(${cols}, 60px)`,
          gridTemplateRows: `repeat(${rows}, 60px)`,
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
        <button
          onClick={() => dispatch({ type: "MOVE", payload: { btnColor: 0 } })}
          disabled={isGridFull}
        >
          Red
        </button>

        <button
          onClick={() => dispatch({ type: "MOVE", payload: { btnColor: 1 } })}
          disabled={isGridFull}
        >
          Green
        </button>

        <button
          onClick={() => dispatch({ type: "UNDO" })}
          disabled={history.length === 0}
        >
          Undo
        </button>
      </div>
    </div>
  );
}

export default GridGame;
