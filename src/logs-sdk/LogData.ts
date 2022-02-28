import LogRecord from "./LogRecord";
import { InstrumentationLibrary } from '@opentelemetry/core';

export default class LogData {
  readonly logRecord: LogRecord;
  readonly instrumentationLibrary: InstrumentationLibrary;

  constructor(
    private logRecord: LogRecord,
    private instrumentationLibrary: InstrumentationLibrary
  ) {
    this.logRecord = logRecord;
    this.instrumentationLibrary = instrumentationLibrary;
  }
}
