const express = require("express");
const studentApp = express.Router();

const { studentOrAdminLogin, createStudentorAdmin } = require("./util");
const expressAsyncHandler = require("express-async-handler");

// student Creation
studentApp.get("/create", (req, res) => {
  res.send({ message: "This is the GET endpoint" });
});

studentApp.post("/create", expressAsyncHandler(createStudentorAdmin));

// student Login
studentApp.post("/login", expressAsyncHandler(studentOrAdminLogin));

// Delete Student
studentApp.post(
  "/delete",
  expressAsyncHandler(async (req, res) => {
    const studentsCollection = req.app.get("studentsCollection");
    const email = req.body.email;
    const result = await studentsCollection.deleteOne({ email: email });
    if (result.deletedCount === 1) {
      res.send({ message: "Student deleted successfully" });
    } else {
      res.send({ message: "Student not found" });
    }
  }),
);

// Leave Request
studentApp.post(
  "/leave",
  expressAsyncHandler(async (req, res) => {
    const studentsCollection = req.app.get("studentsCollection");
    const leaveRequest = req.body;
    const result = await studentsCollection.updateOne(
      { email: leaveRequest.email },
      { onleave: "Pending" },
    );
    if (result.modifiedCount === 1) {
      res.send({ message: "Leave request submitted successfully" });
    } else {
      res.send({ message: "Failed to submit leave request" });
    }
  }),
);

module.exports = studentApp;
