const express = require("express");
require("./services/passport.js");
const authRoutes = require("./routes/auth");

const app = express();

app.get("/", (req, res) => res.send("Howdy!"));
authRoutes(app);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Hi from port ${PORT}`));
