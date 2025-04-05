const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const roomRouter = express.Router();

// POST /add — Add a new room
roomRouter.post(
  "/add",
  expressAsyncHandler(async (req, res) => {
    const roomCollection = req.app.get("roomCollection");
    const { roomNumber, maxCapacity } = req.body;

    if (!roomNumber || !maxCapacity) {
      return res
        .status(400)
        .send({ message: "Missing roomNumber or maxCapacity" });
    }

    const existingRoom = await roomCollection.findOne({ roomNumber });
    if (existingRoom) {
      return res.status(400).send({ message: "Room already exists" });
    }

    const newRoom = {
      roomNumber,
      maxCapacity,
      currentCapacity: maxCapacity,
      students: [],
      mails: [],
    };

    await roomCollection.insertOne(newRoom);
    res.status(201).send({ message: "Room added", room: newRoom });
  }),
);

// GET / — Fetch all rooms
roomRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const roomCollection = req.app.get("roomCollection");
    const rooms = await roomCollection.find({}).toArray();
    res.send({ message: "All Rooms", rooms });
  }),
);

// GET /available — Fetch rooms with available capacity
roomRouter.get(
  "/available",
  expressAsyncHandler(async (req, res) => {
    const roomCollection = req.app.get("roomCollection");
    const availableRooms = await roomCollection
      .find({ currentCapacity: { $gt: 0 } })
      .toArray();
    res.send({ message: "Available Rooms", rooms: availableRooms });
  }),
);

// POST /allot — Allot a student to a room
roomRouter.post(
  "/allot",
  expressAsyncHandler(async (req, res) => {
    const roomCollection = req.app.get("roomCollection");
    const studentCollection = req.app.get("studentsCollection");
    const { email, roomNumber } = req.body;

    if (!email || !roomNumber) {
      return res.status(400).send({ message: "Missing email or roomNumber" });
    }

    const room = await roomCollection.findOne({ roomNumber });
    if (!room) {
      return res.status(404).send({ message: "Room not found" });
    }

    if (room.currentCapacity <= 0) {
      return res.status(400).send({ message: "Room is full" });
    }

    const student = await studentCollection.findOne({ email });
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    // Update student roomNumber
    await studentCollection.updateOne({ email }, { $set: { roomNumber } });

    // Update room currentCapacity and add student to list
    await roomCollection.updateOne(
      { roomNumber },
      {
        $inc: { currentCapacity: -1 },
        $addToSet: { mails: email, students: student.name },
      },
    );

    res.send({ message: "Student allotted to room" });
  }),
);

// POST /vacate — Vacate a student from a room
roomRouter.post(
  "/vacate",
  expressAsyncHandler(async (req, res) => {
    const roomCollection = req.app.get("roomCollection");
    const studentCollection = req.app.get("studentsCollection");
    const { email, roomNumber } = req.body;

    if (!email || !roomNumber) {
      return res.status(400).send({ message: "Missing email or roomNumber" });
    }

    const room = await roomCollection.findOne({ roomNumber });
    if (!room) {
      return res.status(404).send({ message: "Room not found" });
    }

    const student = await studentCollection.findOne({ email });
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    // Update student roomNumber to null
    await studentCollection.updateOne(
      { email },
      { $set: { roomNumber: null } },
    );

    // Update room currentCapacity and remove student from list
    await roomCollection.updateOne(
      { roomNumber },
      {
        $inc: { currentCapacity: 1 },
        $pull: { students: student.name, mails: email },
      },
    );

    res.send({ message: "Student vacated from room" });
  }),
);

module.exports = roomRouter;
