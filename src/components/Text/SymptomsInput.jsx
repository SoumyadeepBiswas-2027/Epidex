import "./SymptomsInput.css";

// Most clinically common descriptors, grouped by category
const DESCRIPTOR_GROUPS = [
  {
    label: "Lesion Type",
    tags: ["Macule", "Papule", "Plaque", "Nodule", "Vesicle", "Pustule", "Bulla", "Wheal", "Cyst", "Ulcer"],
  },
  {
    label: "Surface / Texture",
    tags: ["Scale", "Crust", "Erosion", "Fissure", "Excoriation", "Lichenification", "Hyperkeratotic plaques", "Scar", "Xerosis"],
  },
  {
    label: "Colour",
    tags: ["Erythema", "Brown (Hyperpigmentation)", "White (Hypopigmentation)", "Purpura/Petechiae", "Pigmented", "Yellow", "Gray", "Salmon"],
  },
  {
    label: "Other Features",
    tags: ["Edema", "Exudate", "Induration", "Atrophy", "Telangiectasia", "Striae", "Hair Patch", "Pitted Nail", "Discolored Nail"],
  },
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
        <div className="descriptor-groups">
          {DESCRIPTOR_GROUPS.map((group) => (
            <div className="descriptor-group" key={group.label}>
              <span className="descriptor-group-label">{group.label}</span>
              <div className="symptom-chips">
                {group.tags.map((tag) => (
                  <button
                    key={tag}
                    className={`symptom-chip${activeTags.includes(tag) ? " active" : ""}`}
                    onClick={() => onTagToggle(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <span className="char-count">{symptoms.length} / 800</span>
      </div>
    </div>
  );
}