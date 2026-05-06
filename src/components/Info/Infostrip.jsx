import "./InfoStrip.css";

const INFO_ITEMS = [
  {
    icon: "🔬",
    title: "CNN-Powered Analysis",
    desc: "Deep convolutional neural network trained on 50k+ labelled dermatology images.",
  },
  {
    icon: "🔒",
    title: "Privacy First",
    desc: "Images are processed locally and never stored on external servers.",
  },
  {
    icon: "⚡",
    title: "Instant Results",
    desc: "Sub-3 second inference with confidence scoring and severity grading.",
  },
];

export default function InfoStrip() {
  return (
    <div className="info-strip">
      {INFO_ITEMS.map((item) => (
        <div className="info-item" key={item.title}>
          <div className="info-icon-wrap">{item.icon}</div>
          <div className="info-text">
            <h5>{item.title}</h5>
            <p>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}