require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Restaurants = require('./model/Restaurants');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

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

app.get('/getRestaurants', (req, res) => {
    res.render('getRestaurants', {title: 'Restaurants', data: null});
})

// app.get('/getRestaurants/:id', (req, res) => {
//     let id = req.params.id;

//     Restaurants.findById(id)
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err));
// })

app.post('/getRestaurants', (req, res) => {
    const {id} = req.body;

    Restaurants.findById(id)
        .then((result) => res.render('getRestaurants', {title: 'Restaurants', data: result}))
        .catch((err) => console.log(err));

})

app.use('', (req, res) => {
    res.status(400).send("404");
})