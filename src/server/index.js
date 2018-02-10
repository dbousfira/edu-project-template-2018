const express = require('express');
const api = require('./api.js');
const config = require('./config.js');

var app = express();

app.use('/', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    next();
});

app.use('/api/episodes', api);

app.listen(config.port);
