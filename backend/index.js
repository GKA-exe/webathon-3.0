const express = require("express")
const app = express()

const port = process.env.PORT || 3000;

app.use(express.json())

app.get("/status", (req, res) => {
    res.send({message: "The server is up", status: "Live"});
})

app.listen(port, () => {
    console.log("Server is up on port " + port);
})
