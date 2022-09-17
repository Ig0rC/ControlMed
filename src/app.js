require('dotenv').config();

const express = require('express');
const ClienteRoutes = require('./routes/ClienteControllerRoutes')

const app = express();

app.use(express.json())


app.use(ClienteRoutes)

module.exports = app;