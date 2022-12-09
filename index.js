'use strict';

require('dotenv').config();
const app = require('./src/server.js');
// const { db } = require('./src/auth/models'); change path to match api-server db
const { db } = require('./src/models');
// const server = require('./src/server.js');


db.sync().then(() => {
  app.start(process.env.PORT || 3001);
});
