* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: system-ui, sans-serif;
}

.App {
  height: 100vh;
  width: 100%;
  display: flex;
}

.star-container {
  width: 300px;
  height: 150px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

/* Smooth transition for fill */
.star-fill-rect {
  transition: width 0.4s ease-in-out;
}

/* Optional: smooth color transition */
