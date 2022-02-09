const express = require("express");
const app = express();
app.use(express.json())
const checkSSL = require("./routes/routeCheckSSL");
const ping = require("./routes/ping");
app.use("/checkCertificates", checkSSL);
app.use("/ping",ping);
module.exports = app;
