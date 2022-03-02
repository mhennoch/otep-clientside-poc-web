import LogExporter from "../log-sdk/export/LogExporter";
import LogData from "../log-sdk/LogData";
import {
  ExportResult,
  ExportResultCode,
  hrTimeToMicroseconds,
  hrTimeToNanoseconds
} from '@opentelemetry/core';
import { storeRequest } from "./storage";

export default class OTLPLocalStorageLogExporter implements LogExporter {
  export(
    logs: LogData[],
    resultCallback: (result: ExportResult) => void
  ): void {
    // for now assuming all logs have the same resource
    const resource = logs[0].logRecord.resource
    const resourceAttributes = Object.keys(resource.attributes).map(key => {
      return {
        key: key,
        value: {
          stringValue: resource.attributes[key]
        }
      }
    })

    const payload = {
      resourceLogs: [{
        resource: {
          attributes: resourceAttributes
        },
        instrumentationLibraryLogs: []
      }]
    }

    const instToLogs = new Map();

    logs.forEach(log => {
      if (!instToLogs.has(log.instrumentationLibrary)) {
        instToLogs.set(log.instrumentationLibrary, []);
      }
      instToLogs.get(log.instrumentationLibrary).push(log);
    })

    const instrumentationLogs = [];
    instToLogs.forEach((value, key) => {
      const instrumentationLog = {
        instrumentationLibrary: key,
        logRecords: []
      }
      value.forEach(log => {
        const logRecord = {
          timeUnixNano: hrTimeToNanoseconds(log.logRecord.timestamp),
          observedTimeUnixNano: hrTimeToNanoseconds(log.logRecord.timestamp),
          attributes: []
        }
        logRecord.attributes = Object.keys(log.logRecord.attributes).map(key => {
          return {
            key: key,
            value: {
              stringValue: log.logRecord.attributes[key]
            }
          }
        })
        instrumentationLog.logRecords.push(logRecord);
      })
      instrumentationLogs.push(instrumentationLog);
    }) 

    payload.resourceLogs[0].instrumentationLibraryLogs = instrumentationLogs;
    storeRequest(payload);

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
