import { Resource } from '@opentelemetry/resources';
import LogProcessor from './LogProcessor';
import LogRecord from './LogRecord';
import LogData from './LogData';
import { InstrumentationLibrary } from '@opentelemetry/core';
import { LogEmitterProvider } from './LogEmitterProvider';
import { hrTime } from '@opentelemetry/core';
import * as api from '../logs-api';

export default class LogEmitter implements api.LogEmitter {
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

  addEvent(name: string, attributes: Attributes): void {
    const log = new LogRecord(hrTime(), null, null, this.resource);
    log.setAttribute('event.name', name);

    if (attributes) {
      let key: string;
      for (key in attributes) {
        log.setAttribute(key, attributes[key]);
      }
    }
    
    this.emit(log);
  }

  flush(): void {
    // throw new Error('not implemented')
  }
}
