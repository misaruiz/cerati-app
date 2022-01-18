const express = require("express");
const router = express.Router();
// const fetch = import("node-fetch");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const fetchDiscogs = async (request) => {
    const url = `https://api.discogs.com${request}`;
    const headers = { Authorization: `Discogs key=${process.env.DISCOGS_API_KEY}, secret=${process.env.DISCOGS_API_SECRET}`, };
    try {
        const discogsStream = await fetch(url, {headers});
        const discogsJson = await discogsStream.json();
        return discogsJson;
    } catch(err) {
        return { Error: err.stack };
    }
}

// router.get("/", (req, res) =>  {
//     res.json({ success: "Hello Discogs!" });
// });

// Get Profile
router.get("/users/:username", async (req, res) => {
    // const username = req.params.username;
    // console.log(req);
    const request = req.url;
    const data = await fetchDiscogs(request);
    res.json(data);
});

// Get Collection
router.get("/users/:username/collection/folders/0/releases", async (req, res) => {
    const request = req.url;
    const data = await fetchDiscogs(request);
    res.json(data);
});

// Get Wants
router.get("/users/:username/wants", async (req, res) => {
    const request = req.url;
    const data = await fetchDiscogs(request);
    res.json(data);
});

module.exports = router;