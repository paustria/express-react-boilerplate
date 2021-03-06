/* eslint-disable no-console, newline-after-var */
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import settings from 'settings';

/**
 * Initialize the database.
 */
mongoose.connect(settings.MONGO_URI);

/**
 * Initialize the application.
 */
const app = module.exports = express();

/**
 * Support json & urlencoded requests.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Serve files in the /public directory as static files.
 */
app.use(express.static('public'));

require('api/users');

/**
 * Byh default, serve our index.html file
 */
app.get('*', (req, res) => res.sendFile(`${settings.APP_ROOT}/public/index.html`));

/**
 * Run the server
 */
app.listen(settings.APP_PORT, () => console.log(`App listening on port ${settings.APP_PORT}!`));
