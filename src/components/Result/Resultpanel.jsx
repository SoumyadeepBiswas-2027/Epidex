import "./Resultpanel.css";

export default function ResultPanel({ result }) {
  return (
    <div className="result-panel">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="result-header">
        <span className="result-title">⬡ Analysis Complete</span>
        <div className="confidence-badge">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="4" fill="var(--accent-green)" />
          </svg>
          {result.confidence}% Confidence
        </div>
      </div>

      {/* ── Dual Diagnosis Block ─────────────────────────────── */}
      <div className="diagnosis-dual">
        <div className="diagnosis-tier broad">
          <div className="diagnosis-tier-label">
            <span className="tier-dot" />
            Broad Category
          </div>
          <p className="diagnosis-value">{result.broad_category}</p>
        </div>

        <div className="diagnosis-divider" />

        <div className="diagnosis-tier exact">
          <div className="diagnosis-tier-label">
            <span className="tier-dot exact-dot" />
            Exact Disease
          </div>
          <p className="diagnosis-value exact-value">{result.exact_disease}</p>
        </div>
      </div>

      {/* ── Info Grid ───────────────────────────────────────── */}
      <div className="result-grid">
        <div className="result-item">
          <h4>Severity Level</h4>
          <p>{result.severity}</p>
          <div className="severity-bar">
            <div className="severity-fill" style={{ width: `${result.confidence}%` }} />
          </div>
        </div>

        <div className="result-item">
          <h4>Recommended Action</h4>
          <p className="muted">{result.recommendation}</p>
        </div>

        {result.description && (
          <div className="result-item full-width">
            <h4>Description</h4>
            <p className="muted">{result.description}</p>
          </div>
        )}
      </div>

      {/* ── Disclaimer ──────────────────────────────────────── */}
      <div className="result-disclaimer">
        <span>⚠</span>
        <span>
          This is a preliminary AI-assisted analysis for informational purposes only.
          It is not a substitute for professional medical advice, diagnosis, or treatment.
          Please consult a licensed dermatologist.
        </span>
      </div>
    </div>
  );
}