// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.options("*", cors()); // Handle preflight requests

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/church_membership",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Define Member Schema
const memberSchema = new mongoose.Schema({
  // Member Personal Details
  membershipNo: { type: String, required: true, unique: true },
  memberSince: Date,
  transferFrom: String,
  firstName: String,
  lastName: String,
  surname: String,
  email: String,
  mobile: String,
  dob: Date,
  motherTongue: String,
  bloodGroup: String,
  gender: { type: String, enum: ["Male", "Female"] },

  // Marriage Details
  maritalStatus: { type: String, enum: ["Married", "Unmarried", ""] },
  marriageAnniversary: Date,

  // Occupation Details
  occupation: String,
  typeOfBusiness: String,
  typeOfJob: String,
  roleDept: String,

  // Baptism Details
  baptismDate: Date,
  baptismConfirmation: String,

  // Address Details
  addressLine1: String,
  addressLine2: String,
  state: String,
  country: String,
  city: String,
  pincode: String,

  // Spouse Details
  spouse: {
    firstName: String,
    lastName: String,
    surname: String,
    email: String,
    mobile: String,
    dob: Date,
    baptismDate: Date,
    baptismConfirmation: String,
    occupation: String,
    typeOfJob: String,
    typeOfBusiness: String,
    roleDept: String,
  },

  // Children Details
  children: [
    {
      gender: { type: String, enum: ["Male", "Female", ""] },
      firstName: String,
      lastName: String,
      dob: Date,
      mobile: String,
      email: String,
      baptismStatus: { type: String, enum: ["Baptized", "To be Baptized", ""] },
      baptismDate: Date,
    },
  ],

  // Dependent Details
  dependent: {
    relation: String,
    firstName: String,
    lastName: String,
    surname: String,
    email: String,
    mobile: String,
    dob: Date,
    baptismDate: Date,
    baptismConfirmation: String,
    occupation: String,
    typeOfJob: String,
    typeOfBusiness: String,
    roleDept: String,
  },

  // Consent
  consent: Boolean,

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Member = mongoose.model("Member", memberSchema);

// API Routes
// Get all members (only head of family data)
app.get("/api/members", async (req, res) => {
  try {
    const members = await Member.find(
      {},
      {
        membershipNo: 1,
        firstName: 1,
        lastName: 1,
        surname: 1,
        email: 1,
        mobile: 1,
      }
    );
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a member and their family
app.get("/api/members/:id/family", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new member
app.post("/api/members", async (req, res) => {
  try {
    const newMember = new Member(req.body);
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a member
app.put("/api/members/:id", async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a member
app.delete("/api/members/:id", async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
