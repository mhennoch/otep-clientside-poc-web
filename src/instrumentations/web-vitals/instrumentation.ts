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
import {getLCP, getFID, getCLS} from 'web-vitals';

const VERSION = '0.0.0';

/**
 * This class represents a document load plugin
 */
export class WebVitalsInstrumentation extends InstrumentationBase<unknown> {
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

    getLCP((entry) => {
      const attributes: Attributes = {
        value: entry.value
      };
      plugin._logEmitter.addEvent('largest-contentful-paint', attributes);
    });

    // FID is not its own event, but a delay in processing of the first user input
    // therefore this is currently captured as a "first input" event with a delay attribute
    // there could be other similar events for subsequent inputs, captured using the
    // Event Timing API
    getFID((entry) => {
      const attributes: Attributes = {
        inputDelay: entry.value
      };
      plugin._logEmitter.addEvent('first-input', attributes);
    });

    // NOTE: CLS is a score, not an event, the timestamp of this event will be the collection
    // time, which is when the page is hidden. It might make sense to capture layout shifts
    // as individual events instead, but backends would have to sum the values to calculate
    // the score
    getCLS((entry) => {
      const attributes: Attributes = {
        value: entry.value
      };
      plugin._logEmitter.addEvent('content-layout-shift', attributes);
    })
  }

  /**
   * implements disable function
   */
  override disable() {
  }
}
