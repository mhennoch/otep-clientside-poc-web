import { diag, DiagConsoleLogger } from "@opentelemetry/api";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { BatchSpanProcessor, ConsoleSpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { Resource, ResourceAttributes } from '@opentelemetry/resources';
import {
  IdGenerator,
  RandomIdGenerator,
} from '@opentelemetry/core';

import LogRecord from "./logs-sdk/LogRecord";
import LogEmitterProvider from "./logs-sdk/LogEmitterProvider";
import SimpleLogProcessor from "./logs-sdk/SimpleLogProcessor";
import ConsoleLogExporter from "./logs-sdk/export/ConsoleLogExporter";
import OTLPLocalStorgeTraceExporter from "./local-storage-exporter/OTLPLocalStorgeTraceExporter";
import OTLPLocalStorgeLogExporter from "./local-storage-exporter/OTLPLocalStorageLogExporter";

import { DocumentLoadInstrumentation } from "./instrumentations/document-load";
import { UserInteractionInstrumentation } from "./instrumentations/user-interaction";
import { PaintTimingInstrumentation } from "./instrumentations/paint-timing";
import { WebVitalsInstrumentation } from "./instrumentations/web-vitals";
import { ErrorInstrumentation } from "./instrumentations/errors";
import { PageVisibilityInstrumentation } from "./instrumentations/page-visibility";

const idGenerator : IdGenerator = new RandomIdGenerator();
const scriptInstaceId = idGenerator.generateSpanId();

function getResourceWithNewSession() {
  let resourceAttributes : ResourceAttributes = {
    'session.id': idGenerator.generateTraceId(),
    'session.scriptInstance': scriptInstaceId
  }
  console.log('New sessionId: ', resourceAttributes.sessionId);
  return new Resource(resourceAttributes)
}
export interface OtelWebType {
  traceProvider?: WebTracerProvider;
  refreshSession: () => void
  init: () => void;
}

export const ExampleOtelBundle: OtelWebType = {
  refreshSession: function() {
    const newResource = this.traceProvider?.resource.merge( getResourceWithNewSession() );
    // @ts-ignore
    this.traceProvider.resource = newResource;
    // @ts-ignore
    this.traceProvider._config.resource = newResource;
    // @ts-ignore
    this.traceProvider._tracers.forEach( tracer => {
      tracer.resource = newResource;
    })
  },
  init: function() {
    diag.setLogger(new DiagConsoleLogger());

    const resource = getResourceWithNewSession();
    const traceProvider = new WebTracerProvider({resource});
    traceProvider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
    traceProvider.addSpanProcessor(new BatchSpanProcessor(new OTLPLocalStorgeTraceExporter()));
    traceProvider.register();

    const logProvider = new LogEmitterProvider({resource});
    logProvider.addLogProcessor(new SimpleLogProcessor(new ConsoleLogExporter()));
    logProvider.addLogProcessor(new SimpleLogProcessor(new OTLPLocalStorgeLogExporter()));
    logProvider.register();

    registerInstrumentations({
      instrumentations: [
        new DocumentLoadInstrumentation(),
        new UserInteractionInstrumentation(),
        new PaintTimingInstrumentation(),
        new WebVitalsInstrumentation(),
        new ErrorInstrumentation(),
        new PageVisibilityInstrumentation()
      ]
    });

    this.traceProvider = traceProvider;
  }

}

export default ExampleOtelBundle;
