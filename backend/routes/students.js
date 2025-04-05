const express = require("express");
const studentApp = express.Router();

const { studentOrAdminLogin, createStudentorAdmin } = require("./util");
const expressAsyncHandler = require("express-async-handler");

// admin Creation
studentApp.get("/create",
  expressAsyncHandler(async (req, res) => {
    res.send({ message: "This is the GET endpoint"});
  }))

studentApp.post("/create", expressAsyncHandler(createStudentorAdmin));

// admin Login
studentApp.post("/login", expressAsyncHandler(studentOrAdminLogin));

// Delete Student
studentApp.post("/delete", expressAsyncHandler(async (req, res) => {
  const studentsCollection = req.app.get("studentsCollection");
  const email = req.body.email;
  const result = await studentsCollection.deleteOne({ email: email });
  if (result.deletedCount === 1) {
    res.send({ message: "Student deleted successfully" });
  } else {
    res.send({ message: "Student not found" });
  }
}));

module.exports = studentApp;