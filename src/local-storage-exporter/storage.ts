import { otlpTypes } from "@opentelemetry/exporter-trace-otlp-http";

export const PREFIX = 'otlp_poc';
export const INDEX_KEY = `${PREFIX}!index`;

export function getStorageKey(kind: 'spans', sessionId: string) {
  return `${PREFIX}_${sessionId}_${kind}`;
}

type RequestType = otlpTypes.opentelemetryProto.collector.trace.v1.ExportTraceServiceRequest;

export function storeRequest(request: RequestType) {
  if (request.resourceSpans) {
    request.resourceSpans.forEach(resourceSpans => {
      // TODO: Determine session ID
      const sessionId = '0';
      storeData('spans', sessionId, resourceSpans)
    });
  }
}

function storeData(kind: 'spans', sessionId: string, resourceSpans: otlpTypes.opentelemetryProto.trace.v1.ResourceSpans): void;
function storeData<T>(kind: string, sessionId: string, item: T): void {
  const storageKey = getStorageKey(kind, sessionId);
  let currentData = localStorage.getItem(storageKey);
  let currentItems: T[];

  if (currentData) {
    currentItems = JSON.parse(currentData);
  } else {
    currentItems = [];
  }

  currentItems.push(item);
  localStorage.setItem(storageKey, JSON.stringify(currentItems));
  updateIndex(sessionId);
}

export interface IndexData {
  lastData: number;
}

function updateIndex(sessionId: string) {
  const data = localStorage.getItem(INDEX_KEY);

  let parsed: Record<string, IndexData>;
  if (data) {
    parsed = JSON.parse(data);
  } else {
    parsed = {};
  }

  parsed[sessionId] = {lastData: Date.now()};
  localStorage.setItem(INDEX_KEY, JSON.stringify(parsed));
}

