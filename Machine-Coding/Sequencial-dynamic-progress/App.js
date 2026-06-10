// Question 1: Sequential Progress Bars
// Build a React application where:

// Clicking Add creates a new progress bar
// Each progress bar takes approximately 2 seconds to complete
// Only one progress bar can run at a time
// Multiple bars can be added while another is running
// Newly added bars should enter a queue
// Bars must execute sequentially
// The interviewer was looking for:

// Queue management
// React state handling
// Timer management
// Side effects
// Clean component architecture



import { useEffect, useState } from "react";

function ProgressBar({ progress }) {
  return (
    <div
      style={{
        width: "400px",
        height: "20px",
        border: "1px solid #ccc",
        marginBottom: "5px",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: "green",
          transition: "width 100ms linear",
        }}
      />
    </div>
  );
}

export default function App() {
  const [bars, setBars] = useState([]);
  const [runningId, setRunningId] = useState(null);

  const addBar = () => {
    const id = Date.now();

    setBars((prev) => [
      ...prev,
      {
        id,
        progress: 0,
        status: "queued",
      },
    ]);
  };

  const startProgress = (id) => {
    setRunningId(id);

    setBars((prev) =>
      prev.map((bar) =>
        bar.id === id
          ? { ...bar, status: "running" }
          : bar
      )
    );

    let progress = 0;

    const interval = setInterval(() => {
      progress += 5;

      setBars((prev) =>
        prev.map((bar) =>
          bar.id === id
            ? { ...bar, progress }
            : bar
        )
      );

      if (progress >= 100) {
        clearInterval(interval);

        setBars((prev) =>
          prev.map((bar) =>
            bar.id === id
              ? {
                  ...bar,
                  progress: 100,
                  status: "completed",
                }
              : bar
          )
        );

        setRunningId(null);
      }
    }, 100);
  };

  useEffect(() => {
    if (runningId) return;

    const nextBar = bars.find(
      (bar) => bar.status === "queued"
    );

    if (nextBar) {
      startProgress(nextBar.id);
    }
  }, [bars, runningId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sequential Progress Bars</h2>

      <button onClick={addBar}>
        Add Progress Bar
      </button>

      {bars.map((bar) => (
        <div
          key={bar.id}
          style={{ marginTop: "15px" }}
        >
          <ProgressBar progress={bar.progress} />

          <strong>{bar.status}</strong>
        </div>
      ))}
    </div>
  );
}
