const debug = require('debuggler')();
const Log = require('involves-changelog-store/src/log.model');
const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose/node8');

const customizationOptions = {};
const LogTC = composeWithMongoose(Log, customizationOptions);

const causaRaizPorEquipe = {
  type: 'String',
  resolve: () => {
    return new Date();
  },
};

schemaComposer.rootQuery().addFields({
  logById: LogTC.getResolver('findById'),
  logByIds: LogTC.getResolver('findByIds'),
  logOne: LogTC.getResolver('findOne'),
  logMany: LogTC.getResolver('findMany'),
  logCount: LogTC.getResolver('count'),
  logConnection: LogTC.getResolver('connection'),
  logPagination: LogTC.getResolver('pagination'),
  causaRaizPorEquipe,
});

const LogsGraphQL = schemaComposer.buildSchema();

module.exports = LogsGraphQL;
