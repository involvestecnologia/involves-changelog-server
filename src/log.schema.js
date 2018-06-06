const { composeWithMongoose } = require('graphql-compose-mongoose/node8');
const { schemaComposer } = require('graphql-compose');

const LogModel = require('involves-changelog-store/src/log.model');

const customizationOptions = {};
const LogSchema = composeWithMongoose(LogModel, customizationOptions);

schemaComposer.rootQuery().addFields({
  logById: LogSchema.getResolver('findById'),
  logByIds: LogSchema.getResolver('findByIds'),
  logOne: LogSchema.getResolver('findOne'),
  logMany: LogSchema.getResolver('findMany'),
  logCount: LogSchema.getResolver('count'),
  logConnection: LogSchema.getResolver('connection'),
  logPagination: LogSchema.getResolver('pagination'),
});

module.exports = schemaComposer.buildSchema();
