/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const express = require('express');

const app = express();
require('dotenv').config();

const port = parseInt(process.env.PORT, 10) || 3000;
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// const path = require('path');
const route = require('./routers/index');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/api/v1', route);
app.listen(port, () => { console.log(`App Listen post ${port}`); });
