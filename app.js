// Basic Lib Import
const express = require('express');
const router = require('./src/router/api');
const app = new express();
const bodyParser = require('body-parser');

// Security Middleware Lib Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
require('dotenv').config();


// Database Lib Import
const mongoose = require('mongoose');

// Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));


// Body Parser Implement
app.use(bodyParser.json())

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 })
app.use(limiter)

// Mongo DB Database Connection

let URI = "mongodb+srv://<username>:<password>@cluster0.g7zuc4b.mongodb.net/jcdl?retryWrites=true&w=majority"
const local = 'mongodb://localhost:27017/jcdl'
let Option = { user: 'sifat355y', pass: 'sifat355y', autoIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(URI, Option)
    .then(() => {
        console.log('Connection Success');
    })
    .catch((error) => {
        console.error('Connection Error:', error);
    });

// Routing Implement
app.use("/api/v1", router)

// Undefined Route Implement
app.use("*", (req, res) => {
    res.status(404).json({ status: "fail", data: "Not Found" })
})


module.exports = app;
