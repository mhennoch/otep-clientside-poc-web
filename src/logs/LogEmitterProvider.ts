import { Resource } from '@opentelemetry/resources';
import LogEmitter from "./LogEmitter";
import LogProcessor from "./LogProcessor";
import { InstrumentationLibrary } from '@opentelemetry/core';

export default class LogEmitterProvider {
  constructor(
    private resource: Resource,
    private processor: LogProcessor
  ) {
    this.instrumentationLibrary = {
      name: 'default',
      version: '1.0.0',
      schemaUrl: 'https://opentelemetry.io/schemas/1.7.0'
    }
  }

  getLogEmitter(): LogEmitter {
    return new LogEmitter(this.resource, this.processor, this.instrumentationLibrary);
  } 

  shutdown(): void {
  }

  forceFlush(): void {
  }
}