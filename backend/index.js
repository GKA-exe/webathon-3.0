const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;

const mongoClient = require("mongodb").MongoClient;
mongoClient
  .connect(process.env.DB_URL)
  .then((client) => {
    const dbObj = client.db("hosteldb");
    const studentsCollection = dbObj.collection("students");
    const adminCollection = dbObj.collection("admin");
    const problemCollection = dbObj.collection("problem");
    app.set("studentsCollection", studentsCollection);
    app.set("adminCollection", adminCollection);
    app.set("problemCollection", problemCollection);
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

// Import apis
const studentApp = require("./routes/students");
const adminApp = require("./routes/admin");
const problemApp = require("./routes/problems");

// Define routes for APIs
app.use(express.json());
app.use("/student", studentApp);
app.use("/admin", adminApp);
app.use("/problem", problemApp);

app.get("/status", (req, res) => {
  res.send({ message: "The server is up", status: "Live" });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
