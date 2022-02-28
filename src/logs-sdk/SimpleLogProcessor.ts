import LogProcessor from "./LogProcessor";
import LogData from "./LogData";
import LogExporter from "./LogExporter";

export default class SimpleLogProcessor implements LogProcessor {
  constructor(private exporter: LogExporter) {
  } 

  emit(data: LogData): void {
    this.exporter.export([data]);
  } 

  shutdown(): void {
  }

  forceFlush(): void {
  }
}
