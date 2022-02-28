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

import { DocumentLoadInstrumentation } from "./instrumentations/document-load";
import { UserInteractionInstrumentation } from "./instrumentations/user-interaction";

export default class ExampleOtelBundle {
  static init() {
    diag.setLogger(new DiagConsoleLogger());

    const idGenerator : IdGenerator = new RandomIdGenerator();

    let resourceAttributes : ResourceAttributes = {
      sessionId: idGenerator.generateTraceId()
    }

    const resource = new Resource(resourceAttributes)

    const traceProvider = new WebTracerProvider({resource});
    traceProvider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
    traceProvider.addSpanProcessor(new BatchSpanProcessor(new OTLPLocalStorgeTraceExporter()));
    traceProvider.register();


    const logProcessor = new SimpleLogProcessor(new ConsoleLogExporter());
    const logProvider = new LogEmitterProvider();
    logProvider.addLogProcessor(logProcessor);
    logProvider.register();

    registerInstrumentations({
      instrumentations: [
        new DocumentLoadInstrumentation(),
        new UserInteractionInstrumentation(),
      ]
    });
  }
}
