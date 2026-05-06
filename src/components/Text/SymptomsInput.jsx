import "./SymptomsInput.css";

const QUICK_SYMPTOMS = [
  "Itching", "Redness", "Peeling", "Swelling",
  "Burning", "Dryness", "Blisters", "Scaling", "Discoloration",
];

export default function SymptomsInput({ symptoms, onSymptomsChange, activeTags, onTagToggle }) {
  return (
    <div className="card symptoms-card">
      <div className="card-label">Symptom Description</div>

      <textarea
        className="symptoms-textarea"
        placeholder="Describe your symptoms in detail — duration, sensation (itching, burning, pain), any triggers, recent changes, medications taken, etc..."
        value={symptoms}
        onChange={(e) => onSymptomsChange(e.target.value)}
        maxLength={800}
        rows={5}
      />

      <div className="symptoms-footer">
        <div className="symptom-chips">
          {QUICK_SYMPTOMS.map((tag) => (
            <button
              key={tag}
              className={`symptom-chip${activeTags.includes(tag) ? " active" : ""}`}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <span className="char-count">{symptoms.length} / 800</span>
      </div>
    </div>
  );
}