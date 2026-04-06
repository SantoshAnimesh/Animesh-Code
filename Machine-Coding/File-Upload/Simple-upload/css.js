.App {
  font-family: sans-serif;
  text-align: center;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f4f6f8;
}

.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: #ffffff;
  padding: 25px;
  border-radius: 12px;
  width: 320px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.card h2 {
  margin-bottom: 15px;
}

input[type="file"] {
  margin-bottom: 10px;
}

.file-name {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: #e0e0e0;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 15px;
}

.progress-fill {
  height: 100%;
  background: #4caf50;
  width: 0%;
  transition: width 0.3s ease;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  background: #4caf50;
  color: white;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #43a047;
}

button:disabled {
  background: #9e9e9e;
  cursor: not-allowed;
}

.message {
  margin-top: 10px;
  font-size: 14px;
}
