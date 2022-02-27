import LogData from "./LogData";

export default class LogProcessor {
  emit(data: LogData): void {
    this.exporter.export([data]);
  } 

  shutdown(): void {
  }

  forceFlush(): void {
  }
}
