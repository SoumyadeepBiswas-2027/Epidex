import { useRef, useCallback, useState } from "react";
import "./Imageupload.css";

const ALLOWED_TYPES = ["image/png", "image/jpeg"];
const ALLOWED_EXTS  = ["PNG", "JPG", "JPEG"];

export default function ImageUpload({ image, onImageChange }) {
  const fileInputRef = useRef();
  const [dragOver, setDragOver] = useState(false);
  const [error,    setError]    = useState("");
  const prevUrlRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only PNG, JPG and JPEG files are accepted.");
      return;
    }

    setError("");

    // revoke previous object URL to avoid memory leak
    if (prevUrlRef.current) {
      URL.revokeObjectURL(prevUrlRef.current);
    }

    const url = URL.createObjectURL(file);
    prevUrlRef.current = url;
    onImageChange(url);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  const onRemove = () => {
    if (prevUrlRef.current) {
      URL.revokeObjectURL(prevUrlRef.current);
      prevUrlRef.current = null;
    }
    setError("");
    onImageChange(null);
  };

  return (
    <div className="card">
      <div className="card-label">Visual Input</div>

      {!image ? (
        /* ── Drop Zone ──────────────────────────────────────── */
        <>
          <div
            className={`upload-zone${dragOver ? " drag-over" : ""}`}
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,image/png,image/jpeg"
              onChange={(e) => handleFile(e.target.files[0])}
            />

            <div className="upload-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
                  stroke="var(--accent-blue)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div>
              <p className="upload-title">Drop or click to upload</p>
              <p className="upload-sub">High-resolution skin image preferred</p>
            </div>

            <div className="upload-formats">
              {ALLOWED_EXTS.map((f) => (
                <span key={f} className="tag">{f}</span>
              ))}
            </div>
          </div>

          {error && <p className="upload-error">{error}</p>}
        </>
      ) : (
        /* ── Preview ──────────────────────────────────────── */
        <div className="preview-container">
          <img src={image} alt="Uploaded skin" className="preview-image" />

          <div className="scan-line" />

          <div className="corner tl" />
          <div className="corner tr" />
          <div className="corner bl" />
          <div className="corner br" />

          <div className="preview-overlay">
            <p className="preview-info">✓ IMAGE LOADED — READY FOR ANALYSIS</p>
          </div>

          <button className="preview-remove" onClick={onRemove} aria-label="Remove image">
            ✕
          </button>
        </div>
      )}
    </div>
  );
}