require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Restaurants = require('./model/Restaurants');


const app = express();

const PORT = process.env.PORT || 4000;
const DBURI = process.env.MONGO_URI;

// conntect with the database
mongoose.connect(DBURI)
    .then((result) => {
        app.listen(PORT, () => {
            console.log("Server started on port: " + PORT); // if connected then only listen to PORT
        })
    })
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    Restaurants.findOne()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
})

app.use('', (req, res) => {
    res.status(400).send("404");
})