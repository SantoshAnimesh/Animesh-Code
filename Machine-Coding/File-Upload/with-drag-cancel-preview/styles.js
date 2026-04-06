


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
  width: 350px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.drop-zone {
  border: 2px dashed #ccc;
  transition: border 0.3s ease;
}

.drop-zone:hover {
  border-color: #4caf50;
}

h2 {
  margin-bottom: 10px;
}

.hint {
  font-size: 13px;
  color: #777;
  margin-bottom: 10px;
}

input[type="file"] {
  margin-bottom: 10px;
}

.file-list {
  max-height: 80px;
  overflow-y: auto;
  margin-bottom: 10px;
  text-align: left;
}

.file-list p {
  font-size: 13px;
  margin: 2px 0;
  color: #444;
}

.preview {
  width: 100%;
  max-height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: #e0e0e0;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 10px;
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
  font-size: 15px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 5px;
  transition: background 0.3s ease;
}

button:hover {
  background: #43a047;
}

button:disabled {
  background: #9e9e9e;
  cursor: not-allowed;
}

.cancel-btn {
  background: #f44336;
}

.cancel-btn:hover {
  background: #d32f2f;
}

.message {
  margin-top: 10px;
  font-size: 14px;
}
