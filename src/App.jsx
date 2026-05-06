import { useState } from "react";
import "./App.css";
import "./layout.css";

import Navbar        from "./components/Navbar/Navbar";
import Hero          from "./components/Hero/Hero";
import ImageUpload   from "./components/Image/ImageUpload";
import SymptomsInput from "./components/Text/SymptomsInput";
import ResultPanel   from "./components/Result/ResultPanel";
import InfoStrip     from "./components/Info/InfoStrip";

const MOCK_RESULT = {
  condition:      "Eczema (Atopic Dermatitis)",
  confidence:     87,
  severity:       "Moderate",
  description:    "Chronic inflammatory skin condition characterised by itchy, inflamed patches of skin.",
  recommendation: "Consult a dermatologist. Avoid known irritants and maintain consistent skin hydration.",
};

export default function App() {
  const [image,      setImage]      = useState(null);
  const [symptoms,   setSymptoms]   = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [result,     setResult]     = useState(null);

  /* ── Handlers ─────────────────────────────────────────────── */
  const handleImageChange = (url) => { setImage(url); setResult(null); };

  const handleClear = () => {
    setImage(null);
    setSymptoms("");
    setActiveTags([]);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!image && !symptoms && activeTags.length === 0) return;
    setLoading(true);
    setResult(null);

    // ↓ Replace this mock delay with your real CNN API call
    await new Promise((r) => setTimeout(r, 2200));
    setResult(MOCK_RESULT);

    setLoading(false);
  };

  const hasInput = image || symptoms || activeTags.length > 0;

  return (
    <div className="app">
      <Navbar />

      <main style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "56px 48px" }}>
        <Hero />

        <div className="input-grid">
          <ImageUpload image={image} onImageChange={handleImageChange} />
          <SymptomsInput
            symptoms={symptoms}
            onSymptomsChange={setSymptoms}
            activeTags={activeTags}
            onTagToggle={(tag) =>
              setActiveTags((prev) =>
                prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
              )
            }
          />
        </div>

        {/* ── Analyse / Clear ─────────────────────────────────── */}
        <div className="analyse-section">
          <button
            className={`btn-analyse${loading ? " loading" : ""}`}
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "" : "⬡ Run Analysis"}
          </button>
          {hasInput && (
            <button className="btn-clear" onClick={handleClear}>
              Clear All
            </button>
          )}
        </div>

        {result && <ResultPanel result={result} />}

        <InfoStrip />
      </main>
    </div>
  );
}