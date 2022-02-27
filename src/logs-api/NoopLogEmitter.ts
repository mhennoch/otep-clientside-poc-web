import { LogEmitter } from './types/LogEmitter';
import { LogRecord } from './types/LogRecord';

export class NoopLogEmitter implements LogEmitter {
  emit(record: LogRecord): void {}
}
