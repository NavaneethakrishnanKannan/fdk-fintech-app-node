require('dotenv').config();
const cors = require('cors');
require('./config/db');
require('./config/twillio');
const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
app.disable('x-powered-by');

app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Server is Running"))

// public routes

app.use('/ticket/', routes.ticket);

app.use('/users/', routes.user);

app.use('/timeline/', routes.timeline);

app.use('/transaction/', routes.transaction);

// private routes

module.exports = app;