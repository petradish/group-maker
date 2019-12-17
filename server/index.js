const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const app = express();
// const server = require('http').createServer(app)

const server = app.listen(PORT, () => console.log(`Connected on port ${PORT}`));

const socketio = require('socket.io');

// handle sockets
const io = socketio(server);
require('./socket')(io);

module.exports = app;


// static middleware
app.use(express.static(path.join(__dirname, '..', 'node_modules')));
app.use(express.static(path.join(__dirname, '..', 'public')));

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// 404 middleware
app.use((req, res, next) =>
  path.extname(req.path).length > 0 ?
    res.status(404).send('Not found') :
    next()
);

// send index.html
app.use('*', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// error handling endware
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.')
);
