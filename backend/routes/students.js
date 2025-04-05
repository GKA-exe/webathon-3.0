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


// Attendance -> Mark Entry
studentApp.post("/attendance/mark", expressAsyncHandler(async (req, res) => {
  const studentsCollection = req.app.get("studentsCollection");
  const attendance = req.body;
  const result = await studentsCollection.updateOne(
    { email: attendance.email },
    { $set: { attendance: "true" } }
  );
  if (result.modifiedCount === 1) {
    res.send({ message: "Entrance marked successfully" });
  } else {
    res.send({ message: "Failed to mark attendance" });
  }
}));

// Attendance -> Mark Exit
studentApp.post("/attendance/exit", expressAsyncHandler(async (req, res) => {
  const studentsCollection = req.app.get("studentsCollection");
  const attendance = req.body;
  const result = await studentsCollection.updateOne(
    { email: attendance.email },
    { $set: { attendance: "false" } }
  );
  if (result.modifiedCount === 1) {
    res.send({ message: "Exit marked successfully" });
  } else {
    res.send({ message: "Failed to mark exit" });
  }
}));

module.exports = studentApp;
