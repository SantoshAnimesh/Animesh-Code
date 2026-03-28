

import { useEffect, useRef, useState } from "react";

function Timer({ HH = 0, MM = 0, SS = 0 }) {
  const initialSeconds = HH * 3600 + MM * 60 + SS;

  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);
  // Format Time
  const formatTime = (time) => {
    const hh = String(Math.floor(time / 3600)).padStart(2, "0");
    const mm = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const ss = String(time % 60).padStart(2, "0");

    return `${hh}:${mm}:${ss}`;
  };

  // Timer Logic
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Handlers
  const handleStart = () => setIsRunning(true);

  const handlePause = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSeconds(initialSeconds);
  };

  return (
    <div className="timer-container">
      <h2>Timer</h2>
      <h1 className="time">{formatTime(seconds)}</h1>

      <div className="action-btn">
        <button onClick={handleStart} disabled={isRunning || seconds <= 0}>
          Start
        </button>
        <button onClick={handlePause} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
export default Timer;

// -------- Css ----------------
.App {
  font-family: sans-serif;
  text-align: center;
}

body {
  width: 100%;
  height: 100vh;
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

* {
  margin: 0px;
  padding: 0px;
}

.timer-container {
  width: 250px;
  height: fit-content;
  padding: 24px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
}
.action-btn {
  width: 100%;
  display: grid;
  margin-top: 8px;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;

  button {
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    background-color: lightgrey;

    &:hover {
      transform: scale(1.02);
    }
  }
}

