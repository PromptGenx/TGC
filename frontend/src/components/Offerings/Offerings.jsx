import React, { useState } from "react";
import "./Offerings.css"; // Custom styles

const Offerings = () => {
  const [formData, setFormData] = useState({
    amount: "",
    purpose: "Offering",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Donation Details:", formData);
    alert(`Thank you for your ${formData.purpose} of $${formData.amount}!`);
  };

  return (
    <div className="offerings-container">
      <div className="offerings-header">
        <h1>Give Your Offering</h1>
        <p>
          Your generous giving helps us to serve our community and spread the
          love of Christ. <br />
          Every contribution makes a difference. Thank you for your support!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="offerings-form">
        <div className="form-group">
          <label htmlFor="amount">Enter Amount ($)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="purpose">Select Purpose</label>
          <select
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          >
            <option value="Offering">Offering</option>
            <option value="Tithe">Tithe</option>
            <option value="Missions">Missions</option>
            <option value="Church Building Fund">Church Building Fund</option>
            <option value="Charity">Charity</option>
          </select>
        </div>

        <button type="submit" className="donate-button">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Offerings;
