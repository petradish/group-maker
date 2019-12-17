const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db');
const morgan = require('morgan');
const PORT = process.env.PORT || 5000;
const app = express();
// const server = require('http').createServer(app)

const server = app.listen(PORT, () => console.log(`Connected on port ${PORT}`));

const socketio = require('socket.io');

// handle sockets
const io = socketio(server);
require('./socket')(io);

module.exports = app;

db.sync().then(() => console.log('Database is synced'));
// logging middleware
app.use(morgan('dev'));
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
// 'API' routes
app.use('/api', require('./api'));
// send index.html
app.use('*', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// error handling endware
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.')
);
