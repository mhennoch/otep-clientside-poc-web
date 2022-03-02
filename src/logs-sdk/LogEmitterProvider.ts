import { Resource } from '@opentelemetry/resources';
import LogEmitter from "./LogEmitter";
import LogProcessor from "./LogProcessor";
import { LogEmitterConfig } from "./LogEmitterConfig";
import { LogEmitterProvider, logs } from "../logs-api";
import { InstrumentationLibrary } from '@opentelemetry/core';

export default class LogEmitterProvider {
  readonly processors: LogProcessor[] = [];
  readonly resource: Resource;

  constructor(config: LogEmitterConfig = {}) {
    this.resource = config.resource || Resource.empty();
    this.resource = Resource.default().merge(this.resource);
  }

  getLogEmitter(name: string, version?: string): LogEmitter {
    const instrumentationLibrary = {
      name: name,
      version: version
    }
    return new LogEmitter(this.resource, instrumentationLibrary, this);
  } 

  addLogProcessor(logProcessor: LogProcessor): void {
    this.processors.push(logProcessor);
  }

  register(): void {
    logs.setGlobalLogEmitterProvider(this);
  }
}
