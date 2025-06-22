// components/MembersList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MembersList.css";

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          "https://tgcapi.vercel.app/api/members"
        );
        setMembers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch members");
        setLoading(false);
        console.error("Error fetching members:", err);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = members?.filter((member) => {
    const fullName =
      `${member.firstName} ${member.lastName} ${member.surname}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      member.membershipNo.includes(searchTerm) ||
      member.mobile.includes(searchTerm)
    );
  });

  if (loading) return <div className="loading">Loading members...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="members-container">
      <div className="members-header">
        <h1>Church Members</h1>
        <Link to="/" className="back-button">
          Back to Home
        </Link>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, membership number or mobile..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="members-list">
        <table>
          <thead>
            <tr>
              <th>Membership No</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member._id}>
                <td>{member.membershipNo}</td>
                <td>{`${member.firstName} ${member.lastName} ${member.surname}`}</td>
                <td>{member.mobile}</td>
                <td>{member.email}</td>
                <td>
                  <Link
                    to={`/family-tree/${member._id}`}
                    className="family-tree-button"
                  >
                    Family Tree
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersList;
