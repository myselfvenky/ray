const express = require("express")
const app = express();
const cors = require("cors")
app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.send("Welcome to the VARCBYTES CICD Pipeline")
})
app.listen(5000, () => {
    console.log("Server is running on port 5000")
})