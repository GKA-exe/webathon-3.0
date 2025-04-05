const express = require("express");
const studentApp = express.Router();

const { studentOrAdminLogin, createStudentorAdmin } = require("./util");
const expressAsyncHandler = require("express-async-handler");

// admin Creation
studentApp.get("/create",
  expressAsyncHandler(async (req, res) => {
    res.send({ message: "This is the GET endpoint"});
  }))

studentApp.post("/user", expressAsyncHandler(createStudentorAdmin));

// admin Login
studentApp.post("/login", expressAsyncHandler(studentOrAdminLogin));



module.exports = studentApp;