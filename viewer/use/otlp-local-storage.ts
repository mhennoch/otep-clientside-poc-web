import { otlpTypes } from "@opentelemetry/exporter-trace-otlp-http";
import { useEventListener } from "@vueuse/core";
import { computed, DeepReadonly, readonly, Ref, ref, shallowRef, unref, watch } from "vue";

import {getStorageKey} from '../../src/local-storage-exporter/storage';

interface OTLPData {
  spans: OTLPSpan[];
}

type OTLPSpan = otlpTypes.opentelemetryProto.trace.v1.Span & {
  resource?: otlpTypes.opentelemetryProto.resource.v1.Resource;
  instrumentationLibrary?: otlpTypes.opentelemetryProto.common.v1.InstrumentationLibrary;
}

/*
 * VueUse's useStorage doesn't support a Ref key which would cause issues in
 * the rare chance of jumping from one session to another without changing views
 * 
 * ...Rare issue but might as well do things good
 */
export function useOTLPData(sessionId: Ref<string>): DeepReadonly<OTLPData> {
  const data = readonly({
    spans: useLocalStorageData(
      computed(() => getStorageKey('spans', unref(sessionId))),
      processStoredSpans
    )
  });

  return data;
}

function useLocalStorageData<T>(key: Ref<string>, parser: (rawVal: string) => T[]): Ref<T[]> {
  const data = shallowRef<T[]>([]);

  function read(event?: StorageEvent) {
    if (event && event.key !== key.value) {
      return;
    }

    try {
      const rawValue = event ? event.newValue : localStorage.getItem(key.value);
      if (!rawValue) {
        data.value = [];
        return;
      }

      data.value = parser(rawValue);
    } catch (e) {
      console.error('Error parsing localstorage', key.value, e);
    }
  }

  read();
  useEventListener(window, 'storage', e => setTimeout(() => read(e), 0));

  return data;
}

function processStoredSpans(rawData: string): OTLPSpan[] {
  const resSpans: otlpTypes.opentelemetryProto.trace.v1.ResourceSpans[] = JSON.parse(rawData);
  const collectedSpans: OTLPSpan[] = [];

  resSpans.forEach(({resource, instrumentationLibrarySpans}) => {
    instrumentationLibrarySpans.forEach(({instrumentationLibrary, spans}) => {
      spans.forEach(span => {
        collectedSpans.push({
          ...span,
          instrumentationLibrary,
          resource
        })
      })
    })
  });

  return collectedSpans;
}

