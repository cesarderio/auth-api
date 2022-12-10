'use strict';

// api-server

const express = require('express');
const PORT = process.env.PORT || 3002;
// const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500');
// const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const logger = require('./middleware/logger');


const v1Routes = require('./v1.js');
// Esoteric Resources-server
const authRoutes = require('./routes');
///--------------------------------------

const app = express();

// 3rd Party Resources
// const express = require('express');
const cors = require('cors');
// const morgan = require('morgan');

// App Level MW- auth-server
app.use(cors());
// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
//------------------------

//---API-server-------------
app.use(express.json());
app.use(logger);

//------------auth-server------
// Routes
app.use(authRoutes);
//--------------

app.use('/api/v1', v1Routes); // http://localhost:3000/api/v1/clothes

app.use('*', notFound);
app.use(errorHandler);
//---------------------------
//----Auth-Server----------
// Catchalls
// app.use(notFound);
// app.use(errorHandler);

//-----------------

module.exports = {
  server: app,
  start: () => app.listen(PORT, console.log('server running on port', PORT)),
};
