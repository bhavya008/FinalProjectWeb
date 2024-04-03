require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('HOME');
})

app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
})