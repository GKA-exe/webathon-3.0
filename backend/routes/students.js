const crypto = require("crypto");
const express = require("express");
const studentApp = express.Router();
require("dotenv").config();

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
studentApp.post(
  "/attendance/mark",
  expressAsyncHandler(async (req, res) => {
    const studentsCollection = req.app.get("studentsCollection");
    const attendance = req.body;
    const result = await studentsCollection.updateOne(
      { email: attendance.email },
      { $set: { attendance: "true" } },
    );
    if (result.modifiedCount === 1) {
      res.send({ message: "Entrance marked successfully" });
    } else {
      res.send({ message: "Failed to mark attendance" });
    }
  }),
);

// Attendance -> Mark Exit
studentApp.post(
  "/attendance/exit",
  expressAsyncHandler(async (req, res) => {
    const studentsCollection = req.app.get("studentsCollection");
    const attendance = req.body;
    const result = await studentsCollection.updateOne(
      { email: attendance.email },
      { $set: { attendance: "false" } },
    );
    if (result.modifiedCount === 1) {
      res.send({ message: "Exit marked successfully" });
    } else {
      res.send({ message: "Failed to mark exit" });
    }
  }),
);

studentApp.post(
  "/verify-payment",
  expressAsyncHandler(async (req, res) => {
    const studentsCollection = req.app.get("studentsCollection");
    const secret = process.env.WEB_HOOK_SECRET;
    const { email, base_amount } = req.body.payload.payment.entity;
    const student = await studentsCollection.findOne({ email });

    const shaSum = crypto.createHmac("sha256", secret);
    shaSum.update(JSON.stringify(req.body));
    const digest = shaSum.digest("hex");

    if (digest === req.headers["x-razorpay-signature"]) {
      student.feeDue = (student.feeDue || 5000) - base_amount / 100;
      const result = await studentsCollection.updateOne(
        { email: email },
        { $set: { feeDue: student.feeDue } },
      );
      console.log(result);
    }

    res.send({ status: "ok" });
  }),
);

module.exports = studentApp;
