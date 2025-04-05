const express = require("express");
const leaveApp = express.Router();

const expressAsyncHandler = require("express-async-handler");

// Leave Request
leaveApp.post("/apply", expressAsyncHandler(async (req, res) => {
  const leaveCollection = req.app.get("leaveCollection");
  const leaveRequest = req.body;
  leaveRequest.status = "pending"; // Set initial status to Pending
  const result = await leaveCollection.insertOne(leaveRequest);
  if (result.acknowledged) {
    res.send({ message: "Leave request submitted successfully" });
  } else {
    res.send({ message: "Failed to submit leave request" });
  }
}));

// Fetch Leaves to the admin
leaveApp.get("/leaves", expressAsyncHandler(async (req, res) => {
  const leaveCollection = req.app.get("leaveCollection");
  const leaves = await leaveCollection.find({}).toArray();
  res.send(leaves);
}));

// Fetch All Pending Leaves
leaveApp.get("/pending", expressAsyncHandler(async (req, res) => {
  const leaveCollection = req.app.get("leaveCollection");
  const pendingLeaves = await leaveCollection.find({ status: "pending" }).toArray();
  res.send(pendingLeaves);
}));

// Leave Approval
leaveApp.post("/approve", expressAsyncHandler(async (req, res) => {
  const leaveCollection = req.app.get("leaveCollection");
  const studentsCollection = req.app.get("studentsCollection");
  const leaveRequest = req.body;
  const result = await leaveCollection.updateOne(
    { email: leaveRequest.email },
    { $set: { status: "approved" } }
  );
  const studentResult = await studentsCollection.updateOne(
    {email: leaveRequest.email},
    { $set: { onleave: "approved" } }
  );

  if (result.modifiedCount === 1) {
    res.send({ message: "Leave request approved successfully" });
  } else {
    res.send({ message: "Failed to approve leave request" });
  }
}));

module.exports = leaveApp;