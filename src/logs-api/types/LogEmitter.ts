import LogRecord from './LogRecord';
import { Attributes } from './Attributes';

export interface LogEmitter {
  emit(record: LogRecord): void;

  addEvent(name: string, attributes: Attributes);
}
