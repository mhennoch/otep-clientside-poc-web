import { Resource } from '@opentelemetry/resources';
import LogProcessor from './LogProcessor';
import LogRecord from './LogRecord';
import LogData from './LogData';
import { InstrumentationLibrary } from '@opentelemetry/core';

export default class LogEmitter {
  readonly resource: Resource;
  readonly instrumentationLibrary: InstrumentationLibrary;
  readonly processor: LogProcessor;

  constructor(
    resource: Resource,
    processor: LogProcessor,
    instrumentationLibrary: InstrumentationLibrary
  ) {
    this.resource = resource;
    this.processor = processor;
    this.instrumentationLibrary = instrumentationLibrary;
  }

  emit(record: LogRecord): void {
    const data = new LogData(record, this.instrumentationLibrary);
    this.processor.emit(data);
  }

  flush(): void {
    throw new Error('not implemented')
  }
}
