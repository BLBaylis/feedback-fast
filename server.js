const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/Users");
require("./services/passport.js");
const authRoutes = require("./routes/auth");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
const app = express();

app.get("/", (req, res) => res.send("Howdy!"));
authRoutes(app);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Hi from port ${PORT}`));
