'use strict';

// api-server

const express = require('express');

const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');

const authRouter = require('./routes');
const v1Routes = require('./v1.js');



const app = express();
const cors = require('cors');



app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(logger);

app.use(authRouter);
app.use('/api/v1', v1Routes); // http://localhost:3000/api/v1/clothes

app.use('*', notFound);
app.use(errorHandler);



module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
