const express = require("express");
const adminApp = express.Router();

const { studentOrAdminLogin, createStudentorAdmin } = require("./util");
const expressAsyncHandler = require("express-async-handler");

// admin Creation
adminApp.post("/create", expressAsyncHandler(createStudentorAdmin));

// admin Login
adminApp.post("/login", expressAsyncHandler(studentOrAdminLogin));

module.exports = adminApp;