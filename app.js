const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js').appRouter(app, fs);

const server = app.listen(3000, () => {
    console.log('listening on port %s...', server.address().port);
});