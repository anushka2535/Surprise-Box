import React from "react";
import { useNavigate } from "react-router-dom";
import "./AboutSection.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-wrapper">

      {/* BACK BUTTON */}
      <button
        className="back-btn"
        onClick={() => navigate("/Shop")}
      >
        ← Back to Shop
      </button>

      {/* HERO BANNER */}
      <div className="about-hero">
        <div className="overlay">
          <h1>About Our Store</h1>
          <p>Home / About Us</p>
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="about-container">

        <div className="about-grid">

          {/* LEFT IMAGE */}
          <div className="about-img">
            <img
              src="https://freshknots.in/wp-content/uploads/2026/03/MomentInBloom1-540x540.jpg"
              alt="gift shop"
            />
          </div>

          {/* RIGHT TEXT */}
          <div className="about-text">
            <h2>Welcome to SurpriseBox 🎁</h2>

            <p>
              SurpriseBox is your one-stop destination for thoughtful gifts,
              flowers, chocolates, and personalized surprises. We believe every
              gift carries an emotion, and we help you deliver it perfectly.
            </p>

            <p>
              Our mission is to make gifting simple, fast, and meaningful.
              Whether it’s birthdays, anniversaries, or special moments —
              we’ve got you covered.
            </p>

          </div>

        </div>

        {/* FEATURES SECTION */}
        <div className="features">

          <div className="feature-box">
            <h3>🎁 Premium Gifts</h3>
            <p>Carefully curated high-quality products for every occasion.</p>
          </div>

          <div className="feature-box">
            <h3>🚚 Fast Delivery</h3>
            <p>Quick and reliable delivery to make every surprise perfect.</p>
          </div>

          <div className="feature-box">
            <h3>💝 Customer Love</h3>
            <p>Thousands of happy customers and positive experiences.</p>
          </div>

          <div className="feature-box">
            <h3>🔒 Secure Shopping</h3>
            <p>Safe payments and trusted shopping experience.</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default About;