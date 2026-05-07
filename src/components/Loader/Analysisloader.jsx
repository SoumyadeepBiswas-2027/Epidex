import "./Analysisloader.css";
const SCAN_STEPS = [
  "Preprocessing image data...",
  "Extracting visual features...",
  "Running CNN inference...",
  "Classifying broad category...",
  "Identifying exact disease...",
  "Generating report...",
];

export default function AnalysisLoader({ step = 0 }) {
  return (
    <div className="loader-overlay">
      <div className="loader-box">

        {/* ── DNA Helix ───────────────────────────────────────── */}
        <div className="dna-wrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <div className="dna-row" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="dna-node left"  style={{ animationDelay: `${i * 0.08}s` }} />
              <div className="dna-rung"       style={{ animationDelay: `${i * 0.08}s` }} />
              <div className="dna-node right" style={{ animationDelay: `${i * 0.08}s` }} />
            </div>
          ))}
        </div>

        {/* ── Pulse Ring ──────────────────────────────────────── */}
        <div className="pulse-rings">
          <div className="pulse-ring r1" />
          <div className="pulse-ring r2" />
          <div className="pulse-ring r3" />
          <div className="pulse-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 12h-4l-3 9L9 3l-3 9H2"
                stroke="var(--accent-green)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* ── Label ───────────────────────────────────────────── */}
        <div className="loader-label">ANALYSING</div>

        {/* ── Step List ───────────────────────────────────────── */}
        <div className="loader-steps">
          {SCAN_STEPS.map((s, i) => (
            <div
              key={s}
              className={`loader-step ${i < step ? "done" : i === step ? "active" : "pending"}`}
            >
              <span className="step-icon">
                {i < step ? "✓" : i === step ? "▶" : "·"}
              </span>
              {s}
            </div>
          ))}
        </div>

        {/* ── Progress bar ────────────────────────────────────── */}
        <div className="loader-progress-track">
          <div
            className="loader-progress-fill"
            style={{ width: `${Math.round((step / (SCAN_STEPS.length - 1)) * 100)}%` }}
          />
        </div>
        <div className="loader-pct">
          {Math.round((step / (SCAN_STEPS.length - 1)) * 100)}%
        </div>

      </div>
    </div>
  );
}