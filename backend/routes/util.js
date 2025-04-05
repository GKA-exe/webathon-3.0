const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
require("dotenv").config();

async function generateQRcode(email) {
  const studentsCollection = req.app.get("studentsCollection");
  const result = await studentsCollection.updateOne(
    { email: attendance.email },
    { $set: { attendance: "true" } }
  );
  const timestamp = Date.now().toString();
  const fileName = `${timestamp}.png`;
  const qrCodePath = path.join(__dirname, `../public/${fileName}.png`);
  QRCode.toFile(qrCodePath, email, function (err) {
    if (err) throw err;
    console.log('QR code generated!');
  });
}

// Request handler for student/admin registration
const createStudentorAdmin = async (req, res) => {
  const studentsCollection = req.app.get("studentsCollection");
  const adminCollection = req.app.get("adminCollection");

  const user = req.body;

  if (user.userType === "student") {
    const dbuser = await studentsCollection.findOne({ email: user.email });
    console.log(dbuser);
    if (dbuser !== null) {
      return res.send({ message: "Student already exists" });
    }
  }

  if (user.userType === "admin") {
    const dbuser = await adminCollection.findOne({ email: user.email });
    if (dbuser != null) {
      return res.send({ message: "admin already exists" });
    }
  }

  user.password = await bcryptjs.hash(user.password, 7);

  if (user.userType === "student") {
    // QR Code generation
    user.feeDue = 50;
    const timestamp = Date.now().toString();
    const fileName = `${timestamp}.png`;
    const qrCodePath = path.join(__dirname, `../public/qr/${fileName}`);
    user.qrCodePath = `/qr/${fileName}`;
    let qrOutput = `{\n\t\"email\" : \"${user.email}\"\n}`;
    QRCode.toFile(qrCodePath, qrOutput, { margin: 2},  function (err) {
      if (err) throw err;
      console.log('QR code generated!');
    });

    // DB insertion
    await studentsCollection.insertOne(user);
    res.send({ message: "Student created" });
  } else if (user.userType === "admin") {
    await adminCollection.insertOne(user);
    res.send({ message: "Admin created" });
  }
};

const studentOrAdminLogin = async (req, res) => {
  const studentsCollection = req.app.get("studentsCollection");
  const adminCollection = req.app.get("adminCollection");

  const userCred = req.body;

  if (userCred.userType === "student") {
    const dbuser = await studentsCollection.findOne({
      email: userCred.email,
    });
    if (dbuser === null) {
      return res.send({ message: "Invalid email" });
    } else {
      const status = await bcryptjs.compare(userCred.password, dbuser.password);
      if (status === false) {
        return res.send({ message: "Invalid Password" });
      } else {
        const signedToken = jwt.sign(
          { username: dbuser.username },
          process.env.SECRET_KEY,
          {
            expiresIn: "1d",
          },
        );

        delete dbuser.password;
        res.send({
          message: "login success",
          token: signedToken,
          user: dbuser,
        });
      }
    }
  }

  if (userCred.userType === "admin") {
    const dbuser = await adminCollection.findOne({
      email: userCred.email,
    });
    if (dbuser === null) {
      return res.send({ message: "Invalid email" });
    } else {
      const status = await bcryptjs.compare(userCred.password, dbuser.password);
      if (status === false) {
        return res.send({ message: "Invalid Password" });
      } else {
        const signedToken = jwt.sign(
          { username: dbuser.username },
          process.env.SECRET_KEY,
          {
            expiresIn: "1d",
          },
        );

        delete dbuser.password;
        res.send({
          message: "login success",
          token: signedToken,
          user: dbuser,
        });
      }
    }
  }
};

module.exports = { createStudentorAdmin, studentOrAdminLogin };
