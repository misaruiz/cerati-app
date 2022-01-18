require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
const port = 5000;

const discogs = require("./discogs");

app.use(express.json());

const whitelist = ['http://localhost', 'http://localhost:3000'];

const corsOptions = {
    origin: (origin, callback) => {
        if(!origin || whitelist.indexOf(origin) !== -1)  {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

const limiter = rateLimit({
    windowMS: 60000,
    max: 60
})
app.use(limiter);

// test route
app.get("/", (req, res) => res.json({ success: "Hello World!"}));

app.use("/discogs", discogs);

app.listen(port, () => console.log(`App is listening on port ${port}`));