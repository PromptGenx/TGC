import React from "react";
import "./AboutUs.css"; // Add your custom styles here

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>Welcome to TGC Church</h1>
        <p>Our Mission, Vision, and Values</p>
      </div>

      <div className="about-us-content">
        <section className="mission">
          <div className="card">
            <h2>Our Mission</h2>
            <p>
              At TGC Church, our mission is to glorify God by making disciples
              of all nations, teaching them to obey His Word, and serving our
              community with love and compassion.
            </p>
          </div>
        </section>

        <section className="vision">
          <div className="card">
            <h2>Our Vision</h2>
            <p>
              We envision a vibrant and growing community of believers who are
              equipped to impact the world with the message of Christ, offering
              hope, healing, and transformation.
            </p>
          </div>
        </section>

        <section className="values">
          <div className="card">
            <h2>Our Values</h2>
            <ul>
              <li>
                <strong>Faith:</strong> Trusting in God’s plan and purpose for
                our lives.
              </li>
              <li>
                <strong>Community:</strong> Building meaningful relationships
                that reflect Christ’s love.
              </li>
              <li>
                <strong>Service:</strong> Serving others as Christ served us.
              </li>
              <li>
                <strong>Outreach:</strong> Spreading the gospel locally and
                globally.
              </li>
              <li>
                <strong>Growth:</strong> Continually growing in faith,
                knowledge, and spiritual maturity.
              </li>
            </ul>
          </div>
        </section>

        <section className="who-we-are">
          <div className="card">
            <h2>Who We Are</h2>
            <p>
              TGC Church is a Christ-centered community committed to worshiping
              God and sharing His love with the world. Whether you are new to
              the faith or looking for a church family, we invite you to be a
              part of what God is doing here.
            </p>
          </div>
        </section>
      </div>

      <div className="about-us-footer">
        <p>Join us in our journey of faith!</p>
        <button onClick={() => (window.location.href = "/contact")}>
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
