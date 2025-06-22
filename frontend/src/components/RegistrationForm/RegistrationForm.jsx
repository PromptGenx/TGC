// components/RegistrationForm.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegistrationForm.css";
import { toast } from "react-toastify";

// Define reusable structures
const initialChild = {
  gender: "",
  firstName: "",
  lastName: "",
  dob: "",
  mobile: "",
  email: "",
  baptismStatus: "",
  baptismDate: "",
};

const initialSpouse = {
  firstName: "",
  lastName: "",
  surname: "",
  email: "",
  mobile: "",
  dob: "",
  baptismDate: "",
  baptismConfirmation: "",
  occupation: "",
  typeOfJob: "",
  typeOfBusiness: "",
  roleDept: "",
};

const initialDependent = {
  relation: "",
  firstName: "",
  lastName: "",
  surname: "",
  email: "",
  mobile: "",
  dob: "",
  baptismDate: "",
  baptismConfirmation: "",
  occupation: "",
  typeOfJob: "",
  typeOfBusiness: "",
  roleDept: "",
};

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [haveChildren, setHaveChildren] = useState("no");
  const [childrensCount, setChildrensCount] = useState(0);
  console.log(childrensCount);
  const [formData, setFormData] = useState({
    // Member Personal Details
    membershipNo: "",
    memberSince: "",
    transferFrom: "",
    firstName: "",
    lastName: "",
    surname: "",
    email: "",
    mobile: "",
    dob: "",
    motherTongue: "",
    bloodGroup: "",
    gender: "",

    // Marriage Details
    maritalStatus: "",
    marriageAnniversary: "",

    // Occupation Details
    occupation: "",
    typeOfBusiness: "",
    typeOfJob: "",
    roleDept: "",

    // Baptism Details
    baptismDate: "",
    baptismConfirmation: "",

    // Address Details
    addressLine1: "",
    addressLine2: "",
    state: "",
    country: "",
    city: "",
    pincode: "",

    // Spouse Details
    spouse: { ...initialSpouse },

    // Children Details
    // children: Array(childrensCount).fill({ ...initialChild }),
    children: [],

    // Dependent Details
    dependent: { ...initialDependent },

    // Consent
    consent: false,
  });

  // console.log(haveChildren);

  useEffect(() => {
    if (haveChildren === "yes") {
      const newChildren = Array.from(
        { length: childrensCount },
        (_, index) => formData.children[index] || { ...initialChild }
      );
      setFormData((prev) => ({
        ...prev,
        children: newChildren,
      }));
    }
  }, [childrensCount, haveChildren]);

  const handleChange = (e, section, index) => {
    const { name, value, type, checked } = e.target;

    if (section) {
      if (section === "children" && index !== undefined) {
        setFormData((prev) => {
          const updatedChildren = [...prev.children];
          updatedChildren[index] = {
            ...updatedChildren[index],
            [name]: type === "checkbox" ? checked : value,
          };
          return { ...prev, children: updatedChildren };
        });
      } else {
        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            [name]: type === "checkbox" ? checked : value,
          },
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://tgcapi.vercel.app/api/members", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // alert("Registration successful!");
      toast.success("Registration successful!");
      navigate("/members");
    } catch (error) {
      console.error("Error submitting form:", error);
      // alert("Error submitting form. Please try again.");
      toast.error("Registration failed! Try again.");
    }
  };

  return (
    <div className="registration-container">
      <div className="form-header">
        <h1>Throne of Grace Church</h1>
        <h2>Church Membership Form</h2>
        {/* <div className="form-id">TGC 022</div> */}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Member Personal Details */}
        {currentStep === 1 && (
          <div className="form-section">
            <h3>Member Personal Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Membership No</label>
                <input
                  type="text"
                  name="membershipNo"
                  value={formData.membershipNo}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Member Since</label>
                <input
                  type="date"
                  name="memberSince"
                  value={formData.memberSince}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Transfer from</label>
                <input
                  type="text"
                  name="transferFrom"
                  value={formData.transferFrom}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Surname</label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>DOB</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mother Tongue</label>
                <input
                  type="text"
                  name="motherTongue"
                  value={formData.motherTongue}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Blood Group</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                    />{" "}
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                    />{" "}
                    Female
                  </label>
                </div>
              </div>
            </div>

            <h3>Marriage Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Marital Status</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="maritalStatus"
                      value="Married"
                      checked={formData.maritalStatus === "Married"}
                      onChange={handleChange}
                    />{" "}
                    Married
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="maritalStatus"
                      value="Unmarried"
                      checked={formData.maritalStatus === "Unmarried"}
                      onChange={handleChange}
                    />{" "}
                    Unmarried
                  </label>
                </div>
              </div>
              {formData.maritalStatus === "Married" && (
                <div className="form-group">
                  <label>Marriage Anniversary Date</label>
                  <input
                    type="date"
                    name="marriageAnniversary"
                    value={formData.marriageAnniversary}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            <div className="form-navigation">
              <button type="button" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Occupation & Baptism & Address Details */}
        {currentStep === 2 && (
          <div className="form-section">
            <h3>Occupation Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type of Business</label>
                <input
                  type="text"
                  name="typeOfBusiness"
                  value={formData.typeOfBusiness}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type of Job</label>
                <input
                  type="text"
                  name="typeOfJob"
                  value={formData.typeOfJob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role/Dept</label>
                <input
                  type="text"
                  name="roleDept"
                  value={formData.roleDept}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <h3>Baptism Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Baptism Date</label>
                <input
                  type="date"
                  name="baptismDate"
                  value={formData.baptismDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Baptism Confirmation</label>
                <input
                  type="text"
                  name="baptismConfirmation"
                  value={formData.baptismConfirmation}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h3>Address Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Address Line 1</label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address Line 2 (optional)</label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-navigation">
              <button type="button" onClick={prevStep}>
                Previous
              </button>
              <button type="button" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Spouse Details */}
        {currentStep === 3 && (
          <div className="form-section">
            <h3>Spouse Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.spouse.firstName}
                  onChange={(e) => handleChange(e, "spouse")}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.spouse.lastName}
                  onChange={(e) => handleChange(e, "spouse")}
                />
              </div>
              <div className="form-group">
                <label>Surname</label>
                <input
                  type="text"
                  name="surname"
                  value={formData.spouse.surname}
                  onChange={(e) => handleChange(e, "spouse")}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.spouse.email}
                  onChange={(e) => handleChange(e, "spouse")}
                />
              </div>
              <div className="form-group">
                <label>Mobile No</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.spouse.mobile}
                  onChange={(e) => handleChange(e, "spouse")}
                />
              </div>
              <div className="form-group">
                <label>DOB</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.spouse.dob}
                  onChange={(e) => handleChange(e, "spouse")}
                />
              </div>
              <div className="form-group">
                <label>Baptism Date</label>
                <input
                  type="date"
                  name="baptismDate"
                  value={formData.spouse.baptismDate}
                  onChange={(e) => handleChange(e, "spouse")}
                />
              </div>
              <div className="form-group">
                <label>Baptism Confirmation</label>
                <input
                  type="text"
                  name="baptismConfirmation"
                  value={formData.spouse.baptismConfirmation}
                  onChange={(e) => handleChange(e, "spouse")}
                />
              </div>
              <div className="form-group">
                <label>Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.spouse.occupation}
                  onChange={(e) => handleChange(e, "spouse")}
                />
              </div>
              <div className="form-group">
                <label>Type of Job</label>
                <input
                  type="text"
                  name="typeOfJob"
                  value={formData.spouse.typeOfJob}
                  onChange={(e) => handleChange(e, "spouse")}
                />
              </div>
              <div className="form-group">
                <label>Type of Business</label>
                <input
                  type="text"
                  name="typeOfBusiness"
                  value={formData.spouse.typeOfBusiness}
                  onChange={(e) => handleChange(e, "spouse")}
                />
              </div>
              <div className="form-group">
                <label>Role / Dept</label>
                <input
                  type="text"
                  name="roleDept"
                  value={formData.spouse.roleDept}
                  onChange={(e) => handleChange(e, "spouse")}
                />
              </div>
              <div className="form-group">
                <label>Have Children?</label>
                <select onChange={(e) => setHaveChildren(e.target.value)}>
                  <option value="select">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              {haveChildren === "yes" ? (
                <div className="form-group">
                  <label>How Many Childrens?</label>
                  <input
                    type="number"
                    min="0"
                    value={childrensCount}
                    onChange={(e) =>
                      setChildrensCount(parseInt(e.target.value, 10))
                    }
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="form-navigation">
              <button type="button" onClick={prevStep}>
                Previous
              </button>
              <button type="button" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Children Details */}
        {currentStep === 4 && (
          <div className="form-section">
            {haveChildren === "yes" &&
              childrensCount > 0 &&
              formData.children.map((child, index) => (
                <div key={index}>
                  <h3>Child {index + 1} Details</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Gender</label>
                      <div className="radio-group">
                        <label>
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={
                              formData.children[index]?.gender === "Male"
                            }
                            onChange={(e) => handleChange(e, "children", index)}
                          />{" "}
                          Male
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={
                              formData.children[index]?.gender === "Female"
                            }
                            onChange={(e) => handleChange(e, "children", index)}
                          />{" "}
                          Female
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.children[index]?.firstName || ""}
                        onChange={(e) => handleChange(e, "children", index)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.children[index]?.lastName || ""}
                        onChange={(e) => handleChange(e, "children", index)}
                      />
                    </div>

                    <div className="form-group">
                      <label>DOB</label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.children[index]?.dob || ""}
                        onChange={(e) => handleChange(e, "children", index)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Mobile No.</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.children[index]?.mobile || ""}
                        onChange={(e) => handleChange(e, "children", index)}
                      />
                    </div>

                    <div className="form-group">
                      <label>E-mail</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.children[index]?.email || ""}
                        onChange={(e) => handleChange(e, "children", index)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Baptism Status</label>
                      <div className="radio-group">
                        <label>
                          <input
                            type="radio"
                            name="baptismStatus"
                            value="Baptized"
                            checked={
                              formData.children[index]?.baptismStatus ===
                              "Baptized"
                            }
                            onChange={(e) => handleChange(e, "children", index)}
                          />{" "}
                          Baptized
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="baptismStatus"
                            value="To be Baptized"
                            checked={
                              formData.children[index]?.baptismStatus ===
                              "To be Baptized"
                            }
                            onChange={(e) => handleChange(e, "children", index)}
                          />{" "}
                          To be Baptized
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Baptism Date</label>
                      <input
                        type="date"
                        name="baptismDate"
                        value={formData.children[index]?.baptismDate || ""}
                        onChange={(e) => handleChange(e, "children", index)}
                      />
                    </div>
                  </div>
                </div>
              ))}

            <div className="form-navigation">
              <button type="button" onClick={prevStep}>
                Previous
              </button>
              <button type="button" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Dependent Details */}
        {currentStep === 5 && (
          <div className="form-section">
            <h3>Dependent Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Relation</label>
                <input
                  type="text"
                  name="relation"
                  value={formData.dependent.relation}
                  onChange={(e) => handleChange(e, "dependent")}
                />
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.dependent.firstName}
                  onChange={(e) => handleChange(e, "dependent")}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.dependent.lastName}
                  onChange={(e) => handleChange(e, "dependent")}
                />
              </div>
              <div className="form-group">
                <label>Surname</label>
                <input
                  type="text"
                  name="surname"
                  value={formData.dependent.surname}
                  onChange={(e) => handleChange(e, "dependent")}
                />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.dependent.email}
                  onChange={(e) => handleChange(e, "dependent")}
                />
              </div>
              <div className="form-group">
                <label>Mobile No</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.dependent.mobile}
                  onChange={(e) => handleChange(e, "dependent")}
                />
              </div>
              <div className="form-group">
                <label>DOB</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dependent.dob}
                  onChange={(e) => handleChange(e, "dependent")}
                />
              </div>
              <div className="form-group">
                <label>Baptism Date</label>
                <input
                  type="date"
                  name="baptismDate"
                  value={formData.dependent.baptismDate}
                  onChange={(e) => handleChange(e, "dependent")}
                />
              </div>
              <div className="form-group">
                <label>Baptism Confirmation</label>
                <input
                  type="text"
                  name="baptismConfirmation"
                  value={formData.dependent.baptismConfirmation}
                  onChange={(e) => handleChange(e, "dependent")}
                />
              </div>
              <div className="form-group">
                <label>Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.dependent.occupation}
                  onChange={(e) => handleChange(e, "dependent")}
                />
              </div>
              <div className="form-group">
                <label>Type of Job</label>
                <input
                  type="text"
                  name="typeOfJob"
                  value={formData.dependent.typeOfJob}
                  onChange={(e) => handleChange(e, "dependent")}
                />
              </div>
              <div className="form-group">
                <label>Type of Business</label>
                <input
                  type="text"
                  name="typeOfBusiness"
                  value={formData.dependent.typeOfBusiness}
                  onChange={(e) => handleChange(e, "dependent")}
                />
              </div>
              <div className="form-group">
                <label>Role / Dept</label>
                <input
                  type="text"
                  name="roleDept"
                  value={formData.dependent.roleDept}
                  onChange={(e) => handleChange(e, "dependent")}
                />
              </div>
            </div>

            <div className="consent-section">
              <label>
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                />{" "}
                I hereby provide my consent to Throne of Grace Church to send
                SMS, WhatsApp Notifications and Voice calls to inform activities
                and events
              </label>
            </div>

            {/* <div className="signature-section">
              <p>Signature of Head of the family</p>
              <div className="signature-box"></div>
            </div> */}

            <div className="form-navigation">
              <button type="button" onClick={prevStep}>
                Previous
              </button>
              <button type="submit">Submit</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
