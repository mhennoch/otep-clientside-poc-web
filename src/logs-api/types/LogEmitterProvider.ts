import LogEmitter from './LogEmitter'

export interface LogEmitterProvider {
  getLogEmitter(name: string, version?: string): LogEmitter;
}
