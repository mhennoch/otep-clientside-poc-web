
export * from './types/LogEmitterProvider';
export * from './types/LogRecord';
export * from './types/AttributeValue';

import LogsAPI from './api/logs';
export const logs = LogsAPI.getInstance();
