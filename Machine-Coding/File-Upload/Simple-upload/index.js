import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(0);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      setMessage("");

      await axios.post("https://httpbin.org/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);
        },
      });

      setMessage("✅ Upload successful!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>File Upload</h2>

        <input type="file" onChange={handleFileChange} />

        {file && <p className="file-name">Selected: {file.name}</p>}

        {isUploading && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        )}

        <button onClick={handleUpload} disabled={!file || isUploading}>
          {isUploading ? `Uploading ${progress}%` : "Upload"}
        </button>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
