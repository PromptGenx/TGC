import React from "react";
import "./MembershipHome.css";
import { Link } from "react-router-dom";

const MembershipHome = () => {
  return (
    <div className="home-container">
      <div className="church-logo-container">
        {/* <img src="/logo.png" alt="Church Logo" className="church-logo" /> */}
        <h1>Throne of Grace Church</h1>
        <h2>Chanda Nagar, Hyderabad</h2>
      </div>

      <div className="welcome-content">
        <h2>Welcome to Our Church Family</h2>
        <p>
          Throne of Grace Church is a vibrant community of believers dedicated
          to worship, fellowship, and service. Our church provides a spiritual
          home for individuals and families seeking to grow in their faith
          journey.
        </p>
        <p>
          By becoming a registered member, you will have access to all church
          activities, pastoral care, and opportunities to serve in various
          ministries.
        </p>
      </div>

      <div className="action-buttons">
        <Link to="/register" className="action-button register">
          Register as Member
        </Link>
        <Link to="/members" className="action-button view-members">
          View Members
        </Link>
      </div>
    </div>
  );
};

export default MembershipHome;
