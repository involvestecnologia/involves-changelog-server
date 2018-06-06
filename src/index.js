const {
  logger,
  Env,
} = require('../config');
const debug = require('debuggler')();
const Koa = require('koa');
const helmet = require('koa-helmet');
const morgan = require('koa-morgan');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const Router = require('koa-router');
const graphqlHTTP = require('koa-graphql');
const mongoose = require('involves-changelog-store/config/mongoose');
const LogSchema = require('./log.schema');

/**
 * Bootstraps Koa application.
 *
 * @return {Promise<Koa|Server>}
 */
const serve = async (config) => {
  config = Object.assign({
    port: Env.PORT,
  }, config);

  debug(`connecting to "${config.mongourl}"`);
  await mongoose(config.mongourl);

  const app = new Koa();

  app.use(helmet());
  app.use(cors());
  app.use(morgan(Env.HTTP_LOG_CONFIG, { stream: logger.stream }));
  app.use(bodyParser({
    jsonLimit: '10mb',
  }));

  const router = new Router();

  router.all('/', graphqlHTTP({
    schema: LogSchema,
    graphiql: true,
  }));

  app.use(router.routes()).use(router.allowedMethods());

  if (config.port) {
    debug(`bootstrapping app on port "${config.port}"`);
    return app.listen(config.port);
  }

  return app;
};

module.exports = serve;
