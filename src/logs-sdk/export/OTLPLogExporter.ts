import LogExporter from "./LogExporter";
import LogData from "./LogData";
import {
  ExportResult,
  ExportResultCode,
  hrTimeToMicroseconds,
  hrTimeToNanoseconds
} from '@opentelemetry/core';

export default class OTLPLogExporter implements LogExporter {
  constructor(
    private url: string
  ) {}

  export(
    logs: LogData[],
    resultCallback: (result: ExportResult) => void
  ): void {
    const log = logs[0];

    const payload = {
      resourceLogs: [
        {
          resource: {
            attributes: [
              {
                key: "service.name",
                value: {
                  stringValue: 'unknown_service'
                }
              }
            ],
            droppedAttributesCount: 0
          },
          instrumentationLibraryLogs: [
            {
              instrumentationLibrary: {
                name: 'otep-clientside-poc-web',
                version: '0.0.1'
              },
              logRecords: [
                {
                  timeUnixNano: hrTimeToNanoseconds(log.logRecord.timestamp),
                  observedTimeUnixNano: hrTimeToNanoseconds(log.logRecord.timestamp),
                  name: 'somet name',
                  body: 'some body',
                  attributes: [
                    {
                      key: 'event.name',
                      valueString: 'click'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }

    const options = {
      type: 'application/json'
    }

    navigator.sendBeacon(this.url, JSON.stringify(payload), options);
    if (resultCallback) {
      return resultCallback({ code: ExportResultCode.SUCCESS });
    }
  }
}
