const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;

const mongoClient = require("mongodb").MongoClient;
mongoClient
  .connect(process.env.DB_URL)
  .then((client) => {
    const dbObj = client.db("hosteldb");
    const studentsCollection = dbObj.collection("students");
    const adminCollection = dbObj.collection("admin");
    const leaveCollection = dbObj.collection("leaves");
    const problemCollection = dbObj.collection("problem");
    const roomCollection = dbObj.collection("rooms");
    app.set("studentsCollection", studentsCollection);
    app.set("adminCollection", adminCollection);
    app.set("leaveCollection", leaveCollection);
    app.set("problemCollection", problemCollection);
    app.set("roomCollection", roomCollection);
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

// Import apis
const studentApp = require("./routes/students");
const adminApp = require("./routes/admin");
const leaveApp = require("./routes/leave");
const problemApp = require("./routes/problems");
const roomApp = require("./routes/room");

app.use(cors());
// Define routes for APIs
app.use(express.json());

app.use("/qr", express.static("public/qr"));

app.use("/student", studentApp);
app.use("/admin", adminApp);
app.use("/leave", leaveApp);
app.use("/problem", problemApp);
app.use("/room", roomApp);

app.get("/status", (req, res) => {
  res.send({ message: "The server is up", status: "Live" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.send({ status: "Error", message: err.message });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
