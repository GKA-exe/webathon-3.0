const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const problemRouter = express.Router();

// GET / — fetch all problems
problemRouter.get(
  "/all",
  expressAsyncHandler(async (req, res) => {
    const problemCollection = req.app.get("problemCollection");
    const problems = await problemCollection.find({}).toArray();
    res.send({ message: "All Problems", problems });
  }),
);

// POST / — create a new problem
problemRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const problemCollection = req.app.get("problemCollection");
    const { email, tag, description, roomNumber } = req.body;

    if (!email || !tag || !description || !roomNumber) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const timestamp = new Date().toISOString();
    const problemId = Date.now().toString(); // current UTC time in ms

    const newProblem = {
      problemId,
      email,
      tag,
      timestamp,
      status: "pending",
      description,
      roomNumber,
    };

    await problemCollection.insertOne(newProblem);
    res.status(201).send({ message: "Problem created", problem: newProblem });
  }),
);

// POST /complete — mark a problem as resolved
problemRouter.post(
  "/complete",
  expressAsyncHandler(async (req, res) => {
    const problemCollection = req.app.get("problemCollection");
    const { problemId } = req.body;

    if (!problemId) {
      return res.status(400).send({ message: "problemId is required" });
    }

    const result = await problemCollection.updateOne(
      { problemId },
      { $set: { status: "resolved" } },
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Problem not found" });
    }

    res.send({ message: "Problem marked as resolved" });
  }),
);

module.exports = problemRouter;
