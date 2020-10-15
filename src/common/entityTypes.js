import PropTypes from 'prop-types';
import { MODELS } from "./models";

export const EntityTypes = Object.freeze({
  ActionMapEdge: 'action-map-edge',
  ActionMapGraph: 'action-map-graph',
  ActionMapTemplate: 'action-map-template',
  ActionMapVertex: 'action-map-vertex',
  ChatLog: 'chatlog',
  Engagement: 'engagement',
  FileStorage: 'fileStorage',
  Scenario: 'scenario',
  Session: 'session',
  Step: 'step',
  OperatorLog: 'operator-log',
  Credentials: 'credentials',
  TargetList: 'target-list',
  Task: 'task',
  User: 'user',
  Filter: 'filter'
});

export const BroadcastEntities = Object.freeze({
  Engagement: { entityType: EntityTypes.Engagement, modelName: MODELS.Engagement, port: 8030 },
  Scenario: { entityType: EntityTypes.Scenario, modelName: MODELS.Scenario, port: 8030 },
  Task: { entityType: EntityTypes.Task, modelName: MODELS.Task, port: 8030 },
  Step: { entityType: EntityTypes.Step, modelName: MODELS.Step, port: 8030 },
  FileStorage: { entityType: EntityTypes.FileStorage, modelName: MODELS.File, port: 8030 },
  Credentials: { entityType: EntityTypes.Credentials, modelName: MODELS.Credentials, port: 8032 },
  OperatorLog: { entityType: EntityTypes.OperatorLog, modelName: MODELS.OpLogEntry, port: 10011 },
  Users: { entityType: EntityTypes.User, modelName: MODELS.User, port: 8033 },
  Filter: { entityType: EntityTypes.Filter, modelName: MODELS.Filter, port: 8034 },
  TargetList: { entityType: EntityTypes.TargetList, modelName: MODELS.Target, port: 8031 }
});

export const PaginatedEntities = Object.freeze({
  OpLogEntry: MODELS.OpLogEntry,
  Target: MODELS.Target,
  Credentials: MODELS.Credentials
});

export const EntityPropTypes = PropTypes.oneOf(Object.values(EntityTypes));
export const BroadcastPropTypes = PropTypes.oneOf(Object.values(BroadcastEntities));
