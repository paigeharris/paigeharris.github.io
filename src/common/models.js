import PropTypes from 'prop-types';

export const MODELS = {
  User: 'User',
  Engagement: 'Engagement',
  Scenario: 'Scenario',
  Task: 'Task',
  Step: 'Step',
  File: 'File',
  Terminal: 'Terminal',
  Message: 'Message',
  EngagementReport: 'EngagementReport',
  EngagementExport: 'EngagementExport',
  ActionMapGraph: 'ActionMapGraph',
  ActionMapVertex: 'ActionMapVertex',
  ActionMapEdge: 'ActionMapEdge',
  ActionMapTemplate: 'ActionMapTemplate',
  OpLogEntry: 'OpLogEntry',
  Credentials: 'Credentials',
  Target: 'Target',
  TargetType: 'TargetType',
  Filter: 'Filter'
};

export const ModelPropTypes = PropTypes.oneOf(Object.values(MODELS));