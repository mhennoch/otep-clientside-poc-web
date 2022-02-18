import { diag, DiagConsoleLogger } from "@opentelemetry/api";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { DocumentLoadInstrumentation } from "@opentelemetry/instrumentation-document-load";
import { UserInteractionInstrumentation } from "@opentelemetry/instrumentation-user-interaction";
import { ConsoleSpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";

export default class ExampleOtelBundle {
  static init() {
    diag.setLogger(new DiagConsoleLogger());

    const provider = new WebTracerProvider();
    provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

    provider.register();

    registerInstrumentations({
      instrumentations: [
        new DocumentLoadInstrumentation(),
        new UserInteractionInstrumentation(),
      ]
    });
  }
}
