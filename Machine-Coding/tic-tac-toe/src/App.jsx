import { useCallback, useState } from "react";
import "./App.css";


const createGrid = (gridSize=3) =>
  Array.from({ length: gridSize }, (_, r) =>
    Array.from({ length: gridSize }, (_, c) => ({
      id: `${r}-${c}`,
      val: null,
      active: false,
    }))
  );

export const TicTacToe = ({ gridSize = 3 }) => {
  const [boxes, setBoxes] = useState(createGrid(gridSize));
  const [player, setPlayer] = useState("X");
  const [winner, setWinener] = useState(false);

  // ---------- winner check: impment this in utils ----------
  const getWinnerCells = useCallback(
    (grid, p, r, c) => {
      const rowWin = grid[r].every((cell) => cell.val === p);
      if (rowWin) return grid[r].map((_, i) => [r, i]);

      const colWin = grid.every((row) => row[c].val === p);
      if (colWin) return grid.map((_, i) => [i, c]);

      if (r === c) {
        const diagWin = grid.every((row, i) => row[i].val === p);
        if (diagWin) return grid.map((_, i) => [i, i]);
      }

      if (r + c === gridSize - 1) {
        const antiDiagWin = grid.every(
          (row, i) => row[gridSize - 1 - i].val === p
        );
        if (antiDiagWin) return grid.map((_, i) => [i, gridSize - 1 - i]);
      }

      return null;
    },
    [gridSize]
  );

  const handleBoxClick = (r, c) => {
    if (boxes[r][c].val) return; 
    const newGrid = boxes.map((row) => row.map((cell) => ({ ...cell })));
    newGrid[r][c].val = player;

    const winnerCells = getWinnerCells(newGrid, player, r, c);

    if (winnerCells) {
      winnerCells.forEach(([rr, cc]) => {
        newGrid[rr][cc].active = true;
      });
      setBoxes(newGrid);
      setWinener(true);
      return;
    }
    setBoxes(newGrid);
    setPlayer((p) => (p === "X" ? "O" : "X"));
  };

  const reset = () => {
    setBoxes(createGrid());
    setPlayer("X");
    setWinener(false);
  };

  return (
    <div className="grid-container">
      <h2>Tic Tac Toe</h2>
      <p className="player">
        {winner ? "Winner is" : "Next Player"}: {player}
      </p>

      <div className="boxes">
        {boxes.map((row, r) =>
          row.map((cell, c) => (
            <p
              key={cell.id}
              onClick={() => handleBoxClick(r, c)}
              className={`box ${cell.active ? "active" : ""}`}
            >
              {cell.val}
            </p>
          ))
        )}
      </div>

      <button className="reset-btn" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
