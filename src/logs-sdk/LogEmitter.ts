import { Resource } from '@opentelemetry/resources';
import LogProcessor from './LogProcessor';
import LogRecord from './LogRecord';
import LogData from './LogData';
import { InstrumentationLibrary } from '@opentelemetry/core';
import { LogEmitterProvider } from './LogEmitterProvider';
import { hrTime, isTimeInput } from '@opentelemetry/core';
import * as api from '../logs-api';
import { TimeInput } from '@opentelemetry/api';

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

  addEvent(name: string,
    attributesOrStartTime?: Attributes | TimeInput,
    startTime?: TimeInput
  ): void {
    if (isTimeInput(attributesOrStartTime)) {
      if (typeof startTime === 'undefined') {
        startTime = attributesOrStartTime as TimeInput;
      }
      attributesOrStartTime = undefined;
    }
    if (typeof startTime === 'undefined') {
      startTime = hrTime();
    }
    const log = new LogRecord(startTime, null, null, this.resource);
    log.setAttribute('event.name', name);

    if (attributesOrStartTime) {
      let key: string;
      for (key in attributesOrStartTime) {
        log.setAttribute(key, attributesOrStartTime[key]);
      }
    }
    
    this.emit(log);
  }

  flush(): void {
    // throw new Error('not implemented')
  }
}
