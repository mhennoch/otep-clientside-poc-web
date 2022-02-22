import { diag } from '@opentelemetry/api';
import { OTLPTraceExporter, otlpTypes } from "@opentelemetry/exporter-trace-otlp-http";
import { ReadableSpan } from '@opentelemetry/sdk-trace-base';
import { storeRequest } from "./storage";

export default class OTLPLocalStorgeTraceExporter extends OTLPTraceExporter {
  send(
    items: ReadableSpan[],
    onSuccess: () => void,
    onError: (error: otlpTypes.OTLPExporterError) => void
  ) {
    if (this._isShutdown) {
      diag.debug('Shutdown already started. Cannot send objects');
      return;
    }

    const serviceRequest = this.convert(items);
    storeRequest(serviceRequest);

    onSuccess();
  }
}
