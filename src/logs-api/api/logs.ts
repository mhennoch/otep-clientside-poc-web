import {
  GLOBAL_LOGS_API_KEY,
  _global
} from '../internal/global-utils';
import NoopLogEmitterProvider from '../NoopLogEmitterProvider';

export default class LogsAPI {
  private static _instance?: LogsAPI;

  private constructor() {}

  public static getInstance(): LogsAPI {
    if (!this._instance) {
      this._instance = new LogsAPI();
    }

    return this._instance;
  }

  public setGlobalLogEmitterProvider(provider: LogEmitterProvider): boolean {
    if (_global[GLOBAL_LOGS_API_KEY]) {
      return _global[GLOBAL_LOGS_API_KEY];
    }

    _global[GLOBAL_LOGS_API_KEY] = provider;

    return provider;
  }

  public getLogEmitterProvider(): LogEmitterProvider {
    return (
      _global[GLOBAL_LOGS_API_KEY] ??
      NOOP_LOG_EMITTER_PROVIDER
    );
  }

  public getLogEmitter(name: string, version?: string): LogEmitter {
    return this.getLogEmitterProvider().getLogEmitter(name, version);
  }
}
