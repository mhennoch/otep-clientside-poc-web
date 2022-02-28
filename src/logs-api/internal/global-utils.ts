
import { _globalThis } from '../platform';

export const GLOBAL_LOGS_API_KEY = Symbol.for(
  'io.opentelemetry.js.api.logs'
);

type Get<T> = (version: number) => T;
type OtelGlobal = Partial<{
  [GLOBAL_METRICS_API_KEY]: Get<MeterProvider>;
}>;

export const _global = _globalThis as OtelGlobal;
