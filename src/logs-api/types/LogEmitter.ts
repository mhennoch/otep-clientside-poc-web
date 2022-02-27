import LogRecord from './LogRecord'

export interface LogEmitter {
  emit(record: LogRecord): void {
}
