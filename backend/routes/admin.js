const express = require("express");
const adminApp = express.Router();

const { studentOrAdminLogin, createStudentorAdmin } = require("./util");
const expressAsyncHandler = require("express-async-handler");

// admin Creation
adminApp.post("/create", expressAsyncHandler(createStudentorAdmin));

// admin Login
adminApp.post("/login", expressAsyncHandler(studentOrAdminLogin));

// Post an Announcement
adminApp.post(
  "/announcement",
  expressAsyncHandler(async (req, res) => {
    const announcementCollection = req.app.get("announcementCollection");
    let announcement = req.body;
    announcement.date = new Date();
    const result = await announcementCollection.insertOne(announcement);
    if (result.acknowledged) {
      res.send({ message: "Announcement posted successfully" });
    } else {
      res.send({ message: "Failed to post announcement" });
    }
  }),
);

module.exports = adminApp;