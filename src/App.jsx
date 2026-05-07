import { useState, useEffect, useRef } from "react";
import "./App.css";
import "./layout.css";
import AnalysisLoader from "./components/Loader/Analysisloader";
import Navbar          from "./components/Navbar/Navbar";
import Hero            from "./components/Hero/Hero";
import ImageUpload     from "./components/Image/Imageupload";
import SymptomsInput   from "./components/Text/SymptomsInput";
import ResultPanel     from "./components/Result/Resultpanel";
import InfoStrip       from "./components/Info/Infostrip";


// ─── Mock result matching your AI's actual output shape ──────────
const MOCK_RESULT = {
  broad_category: "Pigmentary Disorders",
  exact_disease:  "Vitiligo",
  confidence:     91,
  severity:       "Moderate",
  description:    "A chronic skin condition characterised by patches of skin losing their pigment due to the destruction of melanocytes.",
  recommendation: "Consult a dermatologist. Treatment options include topical corticosteroids, phototherapy, and depigmentation in extensive cases.",
};

const STEP_DURATION = 380; // ms per step

export default function App() {
  const [image,      setImage]      = useState(null);
  const [symptoms,   setSymptoms]   = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [loaderStep, setLoaderStep] = useState(0);
  const [result,     setResult]     = useState(null);
  const stepTimer = useRef(null);

  /* ── Loader step cycling ────────────────────────────────────── */
  useEffect(() => {
    if (loading) {
      setLoaderStep(0);
      let step = 0;
      stepTimer.current = setInterval(() => {
        step += 1;
        if (step <= 5) setLoaderStep(step);
      }, STEP_DURATION);
    } else {
      clearInterval(stepTimer.current);
    }
    return () => clearInterval(stepTimer.current);
  }, [loading]);

  /* ── Handlers ───────────────────────────────────────────────── */
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
    // The result you get back should have: { broad_category, exact_disease, confidence, severity, description, recommendation }
    await new Promise((r) => setTimeout(r, STEP_DURATION * 7));
    setResult(MOCK_RESULT);

    setLoading(false);
  };

  const hasInput = image || symptoms || activeTags.length > 0;

  return (
    <div className="app">
      {loading && <AnalysisLoader step={loaderStep} />}

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
            disabled={loading || !hasInput}
          >
            {loading ? "" : "⬡ Run Analysis"}
          </button>
          {hasInput && !loading && (
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