import { Resource } from '@opentelemetry/resources';
import { LogProcessor } from './LogProcessor';

export interface LogEmitterConfig {
  resource?: Resource;
  processor: LogProcessor;
}
