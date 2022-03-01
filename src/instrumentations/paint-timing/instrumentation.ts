/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  InstrumentationBase,
  InstrumentationConfig,
} from '@opentelemetry/instrumentation';
import { LogEmitter, logs } from '../../logs-api';

const VERSION = '0.0.0';

/**
 * This class represents a document load plugin
 */
export class PaintTimingInstrumentation extends InstrumentationBase<unknown> {
  readonly component: string = 'paint-timing';
  readonly version: string = '1';
  moduleName = this.component;

  private _logEmitter: LogEmitter;

  /**
   *
   * @param config
   */
  constructor(config: InstrumentationConfig = {}) {
    const instrumentationName = '@opentelemetry/instrumentation-paint-timing';
    super(instrumentationName, VERSION, config);
    this._logEmitter = logs.getLogEmitter(instrumentationName, VERSION);
  }

  init() {}

  /**
   * implements enable function
   */
  override enable() {
    const plugin = this;

    // subscript to paint events
    if (PerformanceObserver == null) {
      return
    }

    const observer: PerformanceObserver = new PerformanceObserver(list => {
      const perfObsEntries = list.getEntries() as PerformanceResourceTiming[];
      perfObsEntries.forEach(entry => {
        if (entry.entryType === 'paint') {
          const attributes: Attributes = {
            startTime: entry.startTime
          };
          plugin._logEmitter.addEvent(entry.name, attributes);
        }
      });
    });
    observer.observe({
      entryTypes: ['paint'],
    });
  }

  /**
   * implements disable function
   */
  override disable() {
  }
}
