
export * from './types/LogEmitter';
export * from './types/LogEmitterProvider';
export * from './types/LogRecord';
export * from './types/Attributes';

import LogsAPI from './api/logs';
export const logs = LogsAPI.getInstance();
