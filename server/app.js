require('dotenv').config()
require("./config/database").connect();

const express = require("express");
const app = express();
const cors = require("cors");
const { verifyCertificate, createCertificate } = require("./controller/certificate");
const { login, logout, register, dashboard } = require("./controller/user");
const auth = require("./middleware/auth");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.static("public"));
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());

app.set("view engine", "ejs");

app.get("/", (req, res) => res.json({
    status: 200,
    message: "API Working",
}));

app.get("/certificate/:id", verifyCertificate);
app.post("/api/certificate", auth, createCertificate);

app.post("/api/register", register);
app.post("/api/login", login);
app.post("/api/logout", logout);
app.get("/api/user", auth, dashboard);


module.exports = app;
