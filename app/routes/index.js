const express = require('express');

const app = express();

const agency = require('./fields/agency');
const stops = require('./fields/stops');
const routes = require('./fields/routes');
const calendar = require('./fields/calendar');
const calendarDate = require('./fields/calendarDate');
const fareAttributes = require('./fields/fareAttributes');
const fareRules = require('./fields/fareRules');
const shapes = require('./fields/shapes');
const trips = require('./fields/trips');
const stopTimes = require('./fields/stopTimes');
const frequencies = require('./fields/frequencies');
const transfers = require('./fields/transfers');
const feedInfo = require('./fields/feedInfo');

app.get('/agency', agency);
app.get('/stops', stops);
app.get('/routes', routes);
app.get('/calendar', calendar);
app.get('/calendarDate', calendarDate);
app.get('/fareAttributes', fareAttributes);
app.get('/fareRules', fareRules);
app.get('/shapes', shapes);
app.get('/trips', trips);
app.get('/stopTimes', stopTimes);
app.get('/frequencies', frequencies);
app.get('/transfers', transfers);
app.get('/feedInfo', feedInfo);

module.exports = app;
