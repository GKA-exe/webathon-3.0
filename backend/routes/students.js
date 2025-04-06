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

// Student Update
studentApp.put(
  "/update",
  expressAsyncHandler(async (req, res) => {
    const studentsCollection = req.app.get("studentsCollection");
    const student = req.body;
    const result = await studentsCollection.updateOne(
      { email: student.email },
      { $set: student },
    );
    if (result.modifiedCount === 1) {
      res.send({ message: "Student updated successfully" });
    } else {
      res.send({ message: "Failed to update student" });
    }
  }),
);

// Fetch a student by email
studentApp.get(
  "/fetch/:email",
  expressAsyncHandler(async (req, res) => {
    const studentsCollection = req.app.get("studentsCollection");
    const email = req.params.email;
    const student = await studentsCollection.findOne({ email: email });
    if (student) {
      res.send(student);
    } else {
      res.send({ message: "Student not found" });
    }
  }),
);

// Fetch is a student is in Hostel or not
studentApp.get(
  "/:email/inhostel",
  expressAsyncHandler(async (req, res) => {
    const studentsCollection = req.app.get("studentsCollection");
    const email = req.params.email;
    const student = await studentsCollection.findOne({ email: email });
    if (student.attendance === "false" || student.onLeave === "approved") {
      res.send({ inHostel: false });
    } else {
      res.send({ inHostel: true });
    }
  }),
);

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

// Fetch All Announcements
studentApp.get(
  "/announcement",
  expressAsyncHandler(async (req, res) => {
    const announcementCollection = req.app.get("announcementCollection");
    const announcements = await announcementCollection.find({}).toArray();
    res.send(announcements);
  }),
);

module.exports = studentApp;
