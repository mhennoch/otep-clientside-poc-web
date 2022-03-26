/*
Copyright 2021 Splunk Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { hrTime } from '@opentelemetry/core';
import { InstrumentationBase, InstrumentationConfig } from '@opentelemetry/instrumentation';
import { LogEmitter, logs } from '../../logs-api';

const MODULE_NAME = 'splunk-visibility';
const VERSION = '1';

export class PageVisibilityInstrumentation extends InstrumentationBase {
  unloading: boolean;
  visibilityListener: any;
  unloadListener: any;

  constructor(config: InstrumentationConfig = {}) {
    super(MODULE_NAME, VERSION, Object.assign({}, config));
    this.unloading = false;
    this._logEmitter = logs.getLogEmitter(MODULE_NAME, VERSION);
  }

  init(): void {}

  enable(): void {
    if (document.hidden) {
      // enable is called from constructor before logEmitter is created
      setTimeout(() => {
        this._createEvent(document.hidden);
      }, 0)
    }

    this.unloadListener = () => {
      this.unloading = true;
    };
        
    this.visibilityListener = () => {
      //ignore when page is unloading as it is expected then
      if (!this.unloading) {
        this._createEvent(document.hidden);
      }
    };
    
    window.addEventListener('beforeunload', this.unloadListener);
    window.addEventListener('visibilitychange', this.visibilityListener);
  }

  disable(): void {
    window.removeEventListener('beforeunload', this.unloadListener);
    window.removeEventListener('visibilitychange', this.visibilityListener);
  }

  private _createEvent(hidden: boolean) {
    const now = hrTime();
    this._logEmitter.addEvent('visibility', {
      hidden: hidden
    })
  }
}
 