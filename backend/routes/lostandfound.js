const express = require("express");
const lostandfoundApp = express.Router();

const expressAsyncHandler = require("express-async-handler");

lostandfoundApp.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const lostandfoundCollection = req.app.get("lostandfoundCollection");
    const lostandfound = req.body;
    const result = await lostandfoundCollection.insertOne(lostandfound);
    if (result.acknowledged) {
      res.send({ message: "Lost and Found posted successfully" });
    } else {
      res.send({ message: "Failed to post Lost and Found" });
    }
  })
);

lostandfoundApp.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const lostandfoundCollection = req.app.get("lostandfoundCollection");
    const lostandfound = await lostandfoundCollection.find({}).toArray();
    res.send(lostandfound);
  })
);

module.exports = lostandfoundApp;
