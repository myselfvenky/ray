const express = require("express")
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors")
app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.send("Welcome to the VARCBYTES CICD Pipeline")
})


app.post("/ping", (
    req, res
) => {
    var nm_inst = nodemailer.createTransport({
        service: 'box.varcsoft.com',
        auth: {
            user: 'venkateshdonthula@varcsoft.com',
            pass: 'venky@0308'
        }
    });
    var mailOptions = {
        from: 'venkateshdonthula@varcsoft.com',
        to: 'robot@varcsoft.com',
        subject: 'CICD - VARCBYTES',
        text: 'That was easy!'
    };
    nm_inst.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send("Error")
        } else {
            console.log('Email sent: ' + info.response);
            res.send("Email sent")
        }
    });
})
app.listen(5000, () => {
    console.log("Server is running on port 5000")
})