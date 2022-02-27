import { LogEmitterProvider } from './types/LogEmitterProvider';
import { LogEmitter } from './types/LogEmitter';
import { NoopLogEmitter } from './NoopLogEmitter';

export class NoopLogEmitterProvider implements LogEmitterProvider {
  getLogEmitter(): LogEmitter {
    return new NoopLogEmitter();
  }
}
