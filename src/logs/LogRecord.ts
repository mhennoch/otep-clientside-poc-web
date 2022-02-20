import * as api from '@opentelemetry/api';
import { Resource } from '@opentelemetry/resources';
import {
  hrTime,
  timeInputToHrTime,
} from '@opentelemetry/core';

export default class LogRecord {
  readonly timestamp: api.HrTime;
  readonly traceId?: string;
  readonly spanId?: string;
  readonly resource?: Resource;
  readonly attributes?: api.SpanAttributes = {};

  constructor(
    timestamp: api.TimeInput = hrTime(),
    traceId?: string,
    spanId?: string
  ) {
    this.timestamp = timeInputToHrTime(timestamp);
  }

  setAttribute(key: string, value?: api.SpanAttributeValue): this {
    this.attributes[key] = value;
  }
}
