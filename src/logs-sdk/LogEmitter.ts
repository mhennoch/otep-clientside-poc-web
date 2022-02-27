import { Resource } from '@opentelemetry/resources';
import LogProcessor from './LogProcessor';
import LogRecord from './LogRecord';
import LogData from './LogData';
import { InstrumentationLibrary } from '@opentelemetry/core';
import { LogEmitterProvider } from './LogEmitterProvider';

export default class LogEmitter {
  readonly resource: Resource;
  readonly instrumentationLibrary: InstrumentationLibrary;
  readonly provider: LogEmitterProvider;

  constructor(
    resource: Resource,
    instrumentationLibrary: InstrumentationLibrary,
    provider: LogEmitterProvider
  ) {
    this.resource = resource;
    this.instrumentationLibrary = instrumentationLibrary;
    this.provider = provider;
  }

  emit(record: LogRecord): void {
    const data = new LogData(record, this.instrumentationLibrary);
    this.provider.processors.forEach(processor => {
      processor.emit(data);
    });
  }

  flush(): void {
    throw new Error('not implemented')
  }
}
