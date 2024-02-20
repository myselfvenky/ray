import express from "express";
const app = express();
import dotenv from "dotenv"
import cors from "cors"
import { sendEmail } from "./Controllers/EmailService/SendEmail.js";
import { initprisma, prisma } from "./Initalizer/initPrisma.js";
app.use(express.json())
app.use(cors())
dotenv.config()
initprisma()
app.get("/", (req, res) => {
    res.send("Welcome to the VARCBYTES CICD Pipeline")
})
app.get("/getPorts", async (req, res) => {
    try {
        const result = await prisma.ports.findMany()
        if (result) {
            res.send(result)
            return
        }
        res.send("Error")
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})
app.post("/createPort", async (req, res) => {
    try {

        const data = req.body.config;
        if (!data) {
            res.status(400).send("Invalid Data")
            return
        }
        if (data.port === undefined || data.port === null) {
            res.status(400).send("Invalid Port")
            return
        }
        const port = await prisma.ports.findUnique({
            where: {
                port: data.port
            }
        });
        if (port) {
            res.status(400).send("Port Already Exists")
            return
        }
        const result = await prisma.ports.create({
            data: data
        })
        if (result) {
            res.send(result)
            return
        }
        res.send("Error")
    } catch (err) {
        console.log(err)
        res.send(err)
    }

})


app.post("/ping", (
    req, res
) => {
    console.log(res)
    res.send(sendEmail(
        "venkateshdonthula@varcsoft.com",
        // eslint-disable-next-line no-undef
        process.env.TO_EMAIL,
        "CICD - VARCBYTES",
        JSON.stringify(req.body),
    ))

})
// eslint-disable-next-line no-undef
app.listen(process.env.NODE_ENV === "development" ?
    // eslint-disable-next-line no-undef
    process.env.DEV_PORT :
    // eslint-disable-next-line no-undef
    process.env.PROD_PORT
    , () => {
        // eslint-disable-next-line no-undef
        process.env.NODE_ENV === "development" ?
            // eslint-disable-next-line no-undef
            console.log(`Server is running on ${process.env.DEV_URL}:{process.env.DEV_PORT}`) :
            // eslint-disable-next-line no-undef
            console.log(`Server is running on ${process.env.PROD_URL}:${process.env.PROD_PORT}`)
    })