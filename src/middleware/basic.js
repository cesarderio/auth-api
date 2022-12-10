'use strict';

const base64 = require('base-64');
const { users } = require('../models');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }
  // let basic = req.headers.authorization.split(' ').pop();
  let basic = req.headers.authorization;
  // let [user, pass] = base64.decode(basic).split(':');
  let [username, pass] = base64.decode(basic.split(' ').pop()).split(':');

  try {
    req.user = await users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    _authError();
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

};
