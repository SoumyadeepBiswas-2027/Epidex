import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-eyebrow">Powered by Deep Learning</div>

      <h2 className="hero-title">
        Intelligent Skin<br />Disease Detection
      </h2>

      <p className="hero-sub">
        Upload an image and describe your symptoms. Our CNN model analyses
        visual patterns and provides a preliminary dermatological assessment.
      </p>
    </section>
  );
}