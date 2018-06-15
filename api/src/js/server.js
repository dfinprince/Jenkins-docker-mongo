'use strict'
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Router
var index = require('./routes/index');

// constants
const port = process.env.port || 8080;

// Create app
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);

app.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

        // Handle specific listen errors with friendly messages
        switch (error.code) {
          case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
          case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
          default:
            throw error;
        }    
    });

app.on('listening', (error) => {
    });

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('listening ' + 'on : ' + port);
})
