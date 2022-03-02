import LogExporter from "./LogExporter";
import LogData from "../LogData";
import {
  ExportResult,
  ExportResultCode,
  hrTimeToMicroseconds
} from '@opentelemetry/core';

export default class ConsoleLogExporter implements LogExporter {
  export(
    logs: LogData[],
    resultCallback: (result: ExportResult) => void
  ): void {
    for (const log of logs) {
      console.log(this._exportInfo(log));
    }
    if (resultCallback) {
      return resultCallback({ code: ExportResultCode.SUCCESS });
    }
  }

  shutdown(): Promise<void> {
    this._sendSpans([]);
    return Promise.resolve();
  }

  private _exportInfo(log: LogData) {
    return {
      traceId: log.logRecord.traceId,
      spanId: log.logRecord.parentSpanId,
      timestamp: hrTimeToMicroseconds(log.logRecord.timestamp),
      attributes: log.logRecord.attributes
    };
  }
}
