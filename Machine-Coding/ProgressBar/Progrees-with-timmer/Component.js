
import React, { useEffect, useRef, useState } from "react";

const MAX_COUNT = 30;
const INTERVAL = 1000;

export default function Progress() {
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev >= MAX_COUNT) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, INTERVAL);

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleStart = () => {
    if (!timerRef.current) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setCount(0);
  };

  const progress = (count / MAX_COUNT) * 100;

  return (
    <div className="container">
      <h1>Progress Bar</h1>

      <h1 className="counter-div">{count}</h1>

      <div className="action-button">
        <button disabled={isRunning} className="btn" onClick={handleStart}>
          Start
        </button>
        <button disabled={!isRunning} className="btn" onClick={handlePause}>
          Pause
        </button>
        <button className="btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="progressbar">
        <span className="progress-fill" style={{ width: `${progress}%` }} />
        <span className="count-value">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}

// ------------- CSS ------------------>
body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: system-ui, sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 300px;
  height: fit-content;
  display: flex;
  /* justify-content: center; */
  gap: 16px;
  flex-direction: column;
  align-items: center;
}

.counter-div {
  width: 200px;
  height: 100px;
  box-shadow: 0px 0px 4px 0.5px rgba(12, 12, 12, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;
}
.action-button {
  width: 200px;
  height: 32px;
  display: flex;
  gap: 2px;
}
.btn {
  flex: 1;
  border: none;
  border-radius: 4px;
  background: #069bf1;
  color: #fff;
  cursor: pointer;
}
.btn:disabled {
  background: rgb(99, 97, 97);
}
.progressbar {
  width: 100%;
  background-color: grey;
  height: 14px;
  margin: 24px 16px;
  border-radius: 8px;
  color: white;
  position: relative;
  padding: 0px;
  overflow: hidden;
}

.count-value {
  width: 12px;
  height: 12px;
  position: absolute;
  margin: 0px;
  padding: 0px;
  font-size: 12px;
  bottom: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.progress-fill {
  display: block;
  background-color: #069bf1;
  height: 100%;
  margin: 0px;
  padding: 0px;
  transition: width 1s linear;
}

