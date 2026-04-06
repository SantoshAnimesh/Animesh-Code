
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  const controllerRef = useRef(null);

  // cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setProgress(0);
    setMessage("");

    if (selectedFiles[0]?.type.startsWith("image")) {
      setPreview(URL.createObjectURL(selectedFiles[0]));
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);

    if (droppedFiles[0]?.type.startsWith("image")) {
      setPreview(URL.createObjectURL(droppedFiles[0]));
    }
  };

  const handleUpload = async () => {
    if (!files.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    controllerRef.current = new AbortController();

    try {
      setIsUploading(true);
      setMessage("");

      await axios.post("https://httpbin.org/post", formData, {
        signal: controllerRef.current.signal,
        // ❌ DO NOT set Content-Type manually
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return; // fix NaN issue

          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);
        },
      });

      setMessage("✅ Upload successful!");
    } catch (error) {
      if (error.name === "CanceledError" || error.name === "AbortError") {
        setMessage("⚠️ Upload cancelled");
      } else {
        console.error(error);
        setMessage("❌ Upload failed!");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    controllerRef.current?.abort();
  };

  return (
    <div className="container">
      <div
        className="card drop-zone"
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <h2>File Upload</h2>

        <input type="file" multiple onChange={handleFileChange} />

        <p className="hint">Drag & Drop files here</p>

        {files.length > 0 && (
          <div className="file-list">
            {files.map((f, i) => (
              <p key={i}>{f.name}</p>
            ))}
          </div>
        )}

        {preview && <img src={preview} alt="preview" className="preview" />}

        {isUploading && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        )}

        <button onClick={handleUpload} disabled={!files.length || isUploading}>
          {isUploading ? `Uploading ${progress}%` : "Upload"}
        </button>

        {isUploading && (
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel Upload
          </button>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
