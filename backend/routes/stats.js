const express = require("express");
const statsApp = express.Router();

statsApp.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        let studentsPresent = 0;
        let studentsOnLeave = 0;
        let complaintsRaised = 0;
        let complaintsCleared = 0;
        let vacantRooms = 0;
        let waitingList = 0;
        const studentsCollection = req.app.get("studentsCollection");
        const leaveCollection = req.app.get("leaveCollection");
        const complaintsCollection = req.app.get("complaintsCollection");
        const roomCollection = req.app.get("roomCollection");
        const students = await studentsCollection.find({}).toArray();
        const leaves = await leaveCollection.find({}).toArray();
        const complaints = await complaintsCollection.find({}).toArray();
        const rooms = await roomCollection.find({}).toArray();
        students.forEach((student) => {
            if (student.attendance === "true") {
                studentsPresent++;
            } else if (student.onLeave === "approved") {
                studentsOnLeave++;
            }
            if(student.room === "none"){
                waitingList++;
            }
        });
        complaints.forEach((complaint) => {
            if (complaint.status === "raised") {
                complaintsRaised++;
            } else if (complaint.status === "cleared") {
                complaintsCleared++;
            }
        });
        rooms.forEach((room) => {
            if (room.currentCapacity > 0) {
                vacantRooms++;
            }
        });
        res.send({
            "studentsPresent" : studentsPresent,
            "studentsOnLeave" : studentsOnLeave,
            "complaintsRaised" : complaintsRaised,
            "complaintsCleared" : complaintsCleared,
            "vacantRooms" : vacantRooms,
            "waitingList" : waitingList,
        });
    }));


module.exports = statsApp;