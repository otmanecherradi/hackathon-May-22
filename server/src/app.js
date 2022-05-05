const express = require('express');

const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

// Configs

// Middlewares
const { errorMiddleware } = require('./middlewares/');

// Routes
const APIRoutes = require('./api/');

// Initiate App
const app = express();

// Logger
app.use(morgan('dev'));

app.use(compression());
app.use(helmet());
app.use(cors());

// trust first proxy
app.set('trust proxy', 1);

// Support for both JSON and FormData
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', APIRoutes);
// app.use('/', );

// Error handles
app.use(errorMiddleware.notFound());
app.use(errorMiddleware.errorHandler());

module.exports = app;
