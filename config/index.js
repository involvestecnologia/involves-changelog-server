const Env = require('./env');

const debug = require('debuggler')();

debug('initializing app configuration');

const Promise = require('./promise');
const logger = require('./logger');

module.exports = {
  Env,
  Promise,
  logger,
};
