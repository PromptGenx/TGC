// components/FamilyTree.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./FamilyTree.css";

const FamilyTree = () => {
  const { memberId } = useParams();
  const [family, setFamily] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFamilyData = async () => {
      try {
        const response = await axios.get(
          `https://tgcapi.vercel.app/api/members/${memberId}/family`
        );
        setFamily(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch family data");
        setLoading(false);
        console.error("Error fetching family data:", err);
      }
    };

    fetchFamilyData();
  }, [memberId]);

  if (loading)
    return <div className="loading">Loading family information...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!family) return <div className="error">No family information found</div>;

  return (
    <div className="family-tree-container">
      <div className="family-tree-header">
        <h1>Family Tree</h1>
        <Link to="/members" className="back-button">
          Back to Members
        </Link>
      </div>

      <div className="family-tree">
        {/* Head of Family */}
        <div className="family-member head">
          <h2>Head of Family</h2>
          <div className="member-card">
            <h3>{`${family.firstName} ${family.lastName} ${family.surname}`}</h3>
            <p>
              <strong>Membership No:</strong> {family.membershipNo}
            </p>
            <p>
              <strong>Gender:</strong> {family.gender}
            </p>
            <p>
              <strong>DOB:</strong> {new Date(family.dob).toLocaleDateString()}
            </p>
            <p>
              <strong>Mobile:</strong> {family.mobile}
            </p>
            <p>
              <strong>Email:</strong> {family.email}
            </p>
          </div>
        </div>

        {/* Spouse */}
        {family.spouse && family.spouse.firstName && (
          <div className="family-member spouse">
            <h2>Spouse</h2>
            <div className="member-card">
              <h3>{`${family.spouse.firstName} ${family.spouse.lastName} ${family.spouse.surname}`}</h3>
              <p>
                <strong>Gender:</strong>{" "}
                {family.gender === "Male" ? "Female" : "Male"}
              </p>
              {family.spouse.dob && (
                <p>
                  <strong>DOB:</strong>{" "}
                  {new Date(family.spouse.dob).toLocaleDateString()}
                </p>
              )}
              {family.spouse.mobile && (
                <p>
                  <strong>Mobile:</strong> {family.spouse.mobile}
                </p>
              )}
              {family.spouse.email && (
                <p>
                  <strong>Email:</strong> {family.spouse.email}
                </p>
              )}
              {family.spouse.occupation && (
                <p>
                  <strong>Occupation:</strong> {family.spouse.occupation}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Children */}
        {family.children &&
          family.children.some((child) => child.firstName) && (
            <div className="family-children">
              <h2>Children</h2>
              <div className="children-container">
                {family.children.map((child, index) => {
                  if (!child.firstName) return null;
                  return (
                    <div
                      key={index}
                      className={`member-card ${
                        child.gender === "Male" ? "boy-child" : "girl-child"
                      }`}
                    >
                      <h3>{`${child.firstName} ${child.lastName}`}</h3>
                      <p>
                        <strong>Gender:</strong> {child.gender}
                      </p>
                      {child.dob && (
                        <p>
                          <strong>DOB:</strong>{" "}
                          {new Date(child.dob).toLocaleDateString()}
                        </p>
                      )}
                      {child.mobile && (
                        <p>
                          <strong>Mobile:</strong> {child.mobile}
                        </p>
                      )}
                      {child.email && (
                        <p>
                          <strong>Email:</strong> {child.email}
                        </p>
                      )}
                      {child.baptismStatus && (
                        <p>
                          <strong>Baptism Status:</strong> {child.baptismStatus}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        {/* Dependent */}
        {family.dependent && family.dependent.firstName && (
          <div className="family-member dependent">
            <h2>Dependent</h2>
            <div className="member-card">
              <h3>{`${family.dependent.firstName} ${
                family.dependent.lastName
              } ${family.dependent.surname || ""}`}</h3>
              <p>
                <strong>Relation:</strong> {family.dependent.relation}
              </p>
              {family.dependent.dob && (
                <p>
                  <strong>DOB:</strong>{" "}
                  {new Date(family.dependent.dob).toLocaleDateString()}
                </p>
              )}
              {family.dependent.mobile && (
                <p>
                  <strong>Mobile:</strong> {family.dependent.mobile}
                </p>
              )}
              {family.dependent.email && (
                <p>
                  <strong>Email:</strong> {family.dependent.email}
                </p>
              )}
              {family.dependent.occupation && (
                <p>
                  <strong>Occupation:</strong> {family.dependent.occupation}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyTree;
