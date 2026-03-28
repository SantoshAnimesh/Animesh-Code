
import React, { useEffect, useRef, useState } from "react";

// helpers
const pad = (v) => String(v).padStart(2, "0");
const clamp = (val, max) => Math.min(max, Math.max(0, val));
const toSeconds = (hh, mm, ss) => hh * 3600 + mm * 60 + ss;

const fromSeconds = (total) => ({
  hh: Math.floor(total / 3600),
  mm: Math.floor((total % 3600) / 60),
  ss: total % 60,
});

const formatInputs = ({ hh, mm, ss }) => ({
  hh: pad(hh),
  mm: pad(mm),
  ss: pad(ss),
});

export default function Timer({ HH = 0, MM = 0, SS = 0 }) {
  const [totalSeconds, setTotalSeconds] = useState(toSeconds(HH, MM, SS));

  const [inputs, setInputs] = useState({
    hh: String(HH),
    mm: String(MM),
    ss: String(SS),
  });

  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  // TIMER
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTotalSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Sync UI while running
  useEffect(() => {
    if (!isRunning) return;
    setInputs(formatInputs(fromSeconds(totalSeconds)));
  }, [totalSeconds, isRunning]);

  // INPUT HANDLER (simple version)
  const handleChange = (field) => (e) => {
    const value = e.target.value;

    if (value === "") {
      setInputs((prev) => ({ ...prev, [field]: "" }));
      return;
    }

    if (!/^\d+$/.test(value)) return;

    const max = field === "hh" ? 12 : 59;
    const num = clamp(parseInt(value, 10), max);

    const updated = { ...inputs, [field]: String(num) };
    setInputs(updated);

    const total = toSeconds(
      parseInt(updated.hh) || 0,
      parseInt(updated.mm) || 0,
      parseInt(updated.ss) || 0
    );

    setTotalSeconds(total);
  };

  // BLUR HANDLER
  const handleBlur = (field) => () => {
    setInputs((prev) => ({
      ...prev,
      [field]: prev[field] === "" ? "00" : pad(prev[field]),
    }));
  };

  // ACTIONS
  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);

  const reset = () => {
    setIsRunning(false);
    const total = toSeconds(HH, MM, SS);
    setTotalSeconds(total);
    setInputs(formatInputs(fromSeconds(total)));
  };

  return (
    <div className="timer-container">
      <h2>Timer</h2>

      <div className="timer-display">
        {["hh", "mm", "ss"].map((field, i) => (
          <React.Fragment key={field}>
            <div className="time-box">
              <input
                value={inputs[field]}
                disabled={isRunning}
                onChange={handleChange(field)}
                onBlur={handleBlur(field)}
              />
            </div>

            {i < 2 && <span className="separator">:</span>}
          </React.Fragment>
        ))}
      </div>

      <div className="timer-actions">
        <button onClick={isRunning ? pause : start}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

// ------------ CSS -------------------
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

/* container */
.timer-container {
  width: 300px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  gap: 16px;
  box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, 0.1);
}

/* display row */
.timer-display {
  display: flex;
  width: 150px;
  height: 32px;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 32px;
  font-weight: 700;
  font-variant-numeric: tabular-nums; /* 🔥 equal width numbers */
}

/* each input box */
.time-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* input */
.timer-display input {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  border: none;
  outline: none;
  background: transparent;
}
.separator {
  display: flex;
  align-items: end;
  justify-content: center;
  height: 100%;
}

.timer-actions {
  display: flex;
  gap: 10px;
}

.timer-actions button {
  padding: 6px 14px;
  border: none;
  background: #eee;
  cursor: pointer;
  border-radius: 4px;
}

.timer-actions button:hover {
  background: #ddd;
}
