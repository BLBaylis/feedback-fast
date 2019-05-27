const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Howdy!"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Hi from port ${PORT}`));
