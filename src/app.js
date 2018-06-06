require('../config');

const debug = require('debuggler')();
const Env = require('../config/env');
const logger = require('../config/logger');
const mongoose = require('involves-changelog-store/config/mongoose');
const Koa = require('koa');
const helmet = require('koa-helmet');
const morgan = require('koa-morgan');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const errorMiddleware = require('./error.middleware');
const graphqlHTTP = require('koa-graphql');
const LogGraphQL = require('./log.graphql.js');
const mount = require('koa-mount');

/**
 * Bootstraps Koa application.
 *
 * @return {Promise<Koa>}
 */
const bootstrap = async () => {
  debug('bootstrapping application');

  const app = new Koa();

  app.use(errorMiddleware());
  app.use(helmet());
  app.use(cors());
  app.use(morgan(Env.HTTP_LOG_CONFIG, { stream: logger.stream }));

  app.use(bodyParser({
    jsonLimit: '10mb',
  }));

  await mongoose();

  app.use(mount('/', graphqlHTTP({
    schema: LogGraphQL,
    graphiql: true,
  })));

  return app;
};

module.exports = bootstrap;
