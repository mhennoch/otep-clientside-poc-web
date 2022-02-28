import { diag, DiagConsoleLogger } from "@opentelemetry/api";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { DocumentLoadInstrumentation } from "@opentelemetry/instrumentation-document-load";
import { UserInteractionInstrumentation } from "@opentelemetry/instrumentation-user-interaction";
import { BatchSpanProcessor, ConsoleSpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { Resource, ResourceAttributes } from '@opentelemetry/resources';
import {
  IdGenerator,
  RandomIdGenerator,
} from '@opentelemetry/core';

import LogRecord from "./logs/LogRecord";
import LogEmitterProvider from "./logs/LogEmitterProvider";
import SimpleLogProcessor from "./logs/SimpleLogProcessor";
import ConsoleLogExporter from "./logs/ConsoleLogExporter";
import OTLPLocalStorgeTraceExporter from "./local-storage-exporter/OTLPLocalStorgeTraceExporter";

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
    const logProvider = new LogEmitterProvider(resource, logProcessor);
    const logEmitter = logProvider.getLogEmitter();

    // test log
    const log = new LogRecord();
    log.setAttribute('event.name', 'click');
    logEmitter.emit(log);

    registerInstrumentations({
      instrumentations: [
        new DocumentLoadInstrumentation(),
        new UserInteractionInstrumentation(),
      ]
    });
  }
}
