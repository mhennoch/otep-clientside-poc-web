var mt=Object.defineProperty;var _t=(o,t,e)=>t in o?mt(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var a=(o,t,e)=>(_t(o,typeof t!="symbol"?t+"":t,e),e);import{s as at,_ as Et}from"./plugin-vue_export-helper.97c540ff.js";import{h as w,t as ft,R as V,E as ct,a as ut,O as Tt,d as E,b as G,o as k,P as p,c as P,I as b,T as gt,e as m,p as vt,f as Lt,g as T,i as $,S as M,j as f,k as pt,l as h,F as wt,L as St,m as bt,s as z,n as yt,D as Nt,W as Pt,q as Rt,C as At,B as Ot,r as It,u as dt,v as B,w as I,x as C,y as L,z as x,A as U,G as Ct,H as kt,J as Dt}from"./vendor.e4b1ce4a.js";class Mt{constructor(t=w(),e,n,r){a(this,"timestamp");a(this,"traceId");a(this,"spanId");a(this,"resource");a(this,"attributes",{});this.timestamp=ft(t),this.resource=r}setAttribute(t,e){this.attributes[t]=e}}class xt{constructor(t,e){a(this,"logRecord");a(this,"instrumentationLibrary");this.logRecord=t,this.instrumentationLibrary=e,this.logRecord=t,this.instrumentationLibrary=e}}class Ht{constructor(t,e,n){a(this,"resource");a(this,"instrumentationLibrary");a(this,"provider");this.resource=t,this.instrumentationLibrary=e,this.provider=n}emit(t){const e=new xt(t,this.instrumentationLibrary);this.provider.processors.forEach(n=>{n.emit(e)})}addEvent(t,e){const n=new Mt(w(),null,null,this.resource);if(n.setAttribute("event.name",t),e){let r;for(r in e)n.setAttribute(r,e[r])}this.emit(n)}flush(){}}const Vt=typeof globalThis=="object"?globalThis:typeof self=="object"?self:typeof window=="object"?window:typeof global=="object"?global:{},A=Symbol.for("io.opentelemetry.js.api.logs"),O=Vt,W=class{constructor(){}static getInstance(){return this._instance||(this._instance=new W),this._instance}setGlobalLogEmitterProvider(t){return O[A]?O[A]:(O[A]=t,t)}getLogEmitterProvider(){var t;return(t=O[A])!=null?t:NOOP_LOG_EMITTER_PROVIDER}getLogEmitter(t,e){return this.getLogEmitterProvider().getLogEmitter(t,e)}};let F=W;a(F,"_instance");const S=F.getInstance();class Ut{constructor(t={}){a(this,"processors",[]);a(this,"resource");this.resource=t.resource||V.empty(),this.resource=V.default().merge(this.resource)}getLogEmitter(t,e){const n={name:t,version:e};return new Ht(this.resource,n,this)}addLogProcessor(t){this.processors.push(t)}register(){S.setGlobalLogEmitterProvider(this)}}class X{constructor(t){this.exporter=t}emit(t){this.exporter.export([t])}shutdown(){}forceFlush(){}}class Ft{export(t,e){for(const n of t)console.log(this._exportInfo(n));if(e)return e({code:ct.SUCCESS})}shutdown(){return this._sendSpans([]),Promise.resolve()}_exportInfo(t){return{traceId:t.logRecord.traceId,spanId:t.logRecord.parentSpanId,timestamp:ut(t.logRecord.timestamp),attributes:t.logRecord.attributes}}}class jt extends Tt{send(t,e,n){if(this._isShutdown){E.debug("Shutdown already started. Cannot send objects");return}const r=this.convert(t);at(r),e()}}class Zt{export(t,e){const n=t[0].logRecord.resource,s={resourceLogs:[{resource:{attributes:Object.keys(n.attributes).map(u=>({key:u,value:{stringValue:n.attributes[u]}}))},instrumentationLibraryLogs:[]}]},i=new Map;t.forEach(u=>{i.has(u.instrumentationLibrary)||i.set(u.instrumentationLibrary,[]),i.get(u.instrumentationLibrary).push(u)});const c=[];if(i.forEach((u,l)=>{const _={instrumentationLibrary:l,logRecords:[]};u.forEach(d=>{const R={timeUnixNano:G(d.logRecord.timestamp),observedTimeUnixNano:G(d.logRecord.timestamp),attributes:[]};R.attributes=Object.keys(d.logRecord.attributes).map(g=>({key:g,value:{stringValue:d.logRecord.attributes[g]}})),_.logRecords.push(R)}),c.push(_)}),s.resourceLogs[0].instrumentationLibraryLogs=c,at(s),e)return e({code:ct.SUCCESS})}shutdown(){return this._sendSpans([]),Promise.resolve()}_exportInfo(t){return{traceId:t.logRecord.traceId,spanId:t.logRecord.parentSpanId,timestamp:ut(t.logRecord.timestamp),attributes:t.logRecord.attributes}}}var y=(o=>(o.COMPONENT="component",o.DOCUMENT_LOAD="documentLoad",o.DOCUMENT_FETCH="documentFetch",o.RESOURCE_FETCH="resourceFetch",o))(y||{}),j=(o=>(o.FIRST_PAINT="firstPaint",o.FIRST_CONTENTFUL_PAINT="firstContentfulPaint",o))(j||{});const Wt=()=>{var e,n;const o={},t=(n=(e=k).getEntriesByType)==null?void 0:n.call(e,"navigation")[0];if(t)Object.values(p).forEach(s=>{if(P(t,s)){const i=t[s];typeof i=="number"&&(o[s]=i)}});else{const s=k.timing;s&&Object.values(p).forEach(c=>{if(P(s,c)){const u=s[c];typeof u=="number"&&(o[c]=u)}})}return o},K={"first-paint":j.FIRST_PAINT,"first-contentful-paint":j.FIRST_CONTENTFUL_PAINT},Gt=o=>{var e,n;const t=(n=(e=k).getEntriesByType)==null?void 0:n.call(e,"paint");t&&t.forEach(({name:r,startTime:s})=>{P(K,r)&&o.addEvent(K[r],s)})},Y="0.0.0";class $t extends b{constructor(t={}){const e="@opentelemetry/instrumentation-document-load";super(e,Y,t);a(this,"component","document-load");a(this,"version","1");a(this,"moduleName",this.component);a(this,"_logEmitter");this._logEmitter=S.getLogEmitter(e,Y)}init(){}_onDocumentLoaded(){window.setTimeout(()=>{this._collectPerformance()})}_addResourcesSpans(t){var n,r;const e=(r=(n=k).getEntriesByType)==null?void 0:r.call(n,"resource");e&&e.forEach(s=>{this._initResourceSpan(s,t)})}_collectPerformance(){const t=Array.from(document.getElementsByTagName("meta")).find(r=>r.getAttribute("name")===gt),e=Wt(),n=t&&t.content||"";m.with(vt.extract(Lt,{traceparent:n}),()=>{const r=this._startSpan(y.DOCUMENT_LOAD,p.FETCH_START,e);!r||(m.with(T.setSpan(m.active(),r),()=>{const s=this._startSpan(y.DOCUMENT_FETCH,p.FETCH_START,e);s&&m.with(T.setSpan(m.active(),s),()=>{$(s,e),this._endSpan(s,p.RESPONSE_END,e)})}),r.setAttribute(M.HTTP_URL,location.href),r.setAttribute(M.HTTP_USER_AGENT,navigator.userAgent),this._addResourcesSpans(r),f(r,p.FETCH_START,e),f(r,p.UNLOAD_EVENT_START,e),f(r,p.UNLOAD_EVENT_END,e),f(r,p.DOM_INTERACTIVE,e),f(r,p.DOM_CONTENT_LOADED_EVENT_START,e),f(r,p.DOM_CONTENT_LOADED_EVENT_END,e),f(r,p.DOM_COMPLETE,e),f(r,p.LOAD_EVENT_START,e),f(r,p.LOAD_EVENT_END,e),Gt(r),this._endSpan(r,p.LOAD_EVENT_END,e))})}_endSpan(t,e,n){t&&(P(n,e)?t.end(n[e]):t.end())}_initResourceSpan(t,e){const n=this._startSpan(y.RESOURCE_FETCH,p.FETCH_START,t,e);n&&(n.setAttribute(M.HTTP_URL,t.name),$(n,t),this._endSpan(n,p.RESPONSE_END,t))}_startSpan(t,e,n,r){if(P(n,e)&&typeof n[e]=="number"){const s=this.tracer.startSpan(t,{startTime:n[e]},r?T.setSpan(m.active(),r):void 0);return s.setAttribute(y.COMPONENT,this.component),s}}_waitForPageLoad(){window.document.readyState==="complete"?this._onDocumentLoaded():(this._onDocumentLoaded=this._onDocumentLoaded.bind(this),window.addEventListener("load",this._onDocumentLoaded))}enable(){window.removeEventListener("load",this._onDocumentLoaded),this._waitForPageLoad()}disable(){window.removeEventListener("load",this._onDocumentLoaded)}}var v=(o=>(o.COMPONENT="component",o.EVENT_TYPE="event_type",o.TARGET_ELEMENT="target_element",o.TARGET_XPATH="target_xpath",o.HTTP_URL="http.url",o.HTTP_USER_AGENT="http.user_agent",o))(v||{});const zt="OT_ZONE_CONTEXT",Bt="Navigation:",Xt=["click"],H="0.0.0";function Kt(){return!1}class Yt extends b{constructor(t){var n;const e="@opentelemetry/instrumentation-user-interaction";super(e,H,t);a(this,"component","user-interaction");a(this,"version",H);a(this,"moduleName",this.component);a(this,"_spansData",new WeakMap);a(this,"_zonePatched");a(this,"_wrappedListeners",new WeakMap);a(this,"_eventsSpanMap",new WeakMap);a(this,"_eventNames");a(this,"_shouldPreventSpanCreation");a(this,"_logEmitter");this._eventNames=new Set((n=t==null?void 0:t.eventNames)!=null?n:Xt),this._shouldPreventSpanCreation=typeof(t==null?void 0:t.shouldPreventSpanCreation)=="function"?t.shouldPreventSpanCreation:Kt,this._logEmitter=S.getLogEmitter(e,H)}init(){}_checkForTimeout(t,e){const n=this._spansData.get(e);n&&(t.source==="setTimeout"?n.hrTimeLastTimeout=w():t.source!=="Promise.then"&&t.source!=="setTimeout"&&(n.hrTimeLastTimeout=void 0))}_allowEventName(t){return this._eventNames.has(t)}_createSpan(t,e,n){if(!(t instanceof HTMLElement)||!t.getAttribute||t.hasAttribute("disabled")||!this._allowEventName(e))return;const r=pt(t,!0);try{const s=this.tracer.startSpan(e,{attributes:{[v.COMPONENT]:this.component,[v.EVENT_TYPE]:e,[v.TARGET_ELEMENT]:t.tagName,[v.TARGET_XPATH]:r,[v.HTTP_URL]:window.location.href,[v.HTTP_USER_AGENT]:navigator.userAgent}},n?T.setSpan(m.active(),n):void 0);return this._shouldPreventSpanCreation(e,t,s)===!0?void 0:(this._spansData.set(s,{taskCount:0}),s)}catch(s){E.error(this.component,s)}}_decrementTask(t){const e=this._spansData.get(t);e&&(e.taskCount--,e.taskCount===0&&this._tryToEndSpan(t,e.hrTimeLastTimeout))}_getCurrentSpan(t){const e=t.get(zt);return e&&T.getSpan(e)}_incrementTask(t){const e=this._spansData.get(t);e&&e.taskCount++}addPatchedListener(t,e,n,r){let s=this._wrappedListeners.get(n);s||(s=new Map,this._wrappedListeners.set(n,s));let i=s.get(e);return i||(i=new Map,s.set(e,i)),i.has(t)?!1:(i.set(t,r),!0)}removePatchedListener(t,e,n){const r=this._wrappedListeners.get(n);if(!r)return;const s=r.get(e);if(!s)return;const i=s.get(t);return i&&(s.delete(t),s.size===0&&(r.delete(e),r.size===0&&this._wrappedListeners.delete(n))),i}_invokeListener(t,e,n){return typeof t=="function"?t.apply(e,n):t.handleEvent(n[0])}_patchAddEventListener(){const t=this;return e=>function(r,s,i){if(!s)return e.call(this,r,s,i);const c=typeof i=="object"&&i.once,u=function(...l){let _;const d=l[0],R=d==null?void 0:d.target;d&&(_=t._eventsSpanMap.get(d)),c&&t.removePatchedListener(this,r,s);const g=t._createSpan(R,r,_);if(t._allowEventName(r)){const D={};t._logEmitter.addEvent(r,D)}return g?(d&&t._eventsSpanMap.set(d,g),m.with(T.setSpan(m.active(),g),()=>{const D=t._invokeListener(s,this,l);return g.end(),D})):t._invokeListener(s,this,l)};if(t.addPatchedListener(this,r,s,u))return e.call(this,r,u,i)}}_patchRemoveEventListener(){const t=this;return e=>function(r,s,i){const c=t.removePatchedListener(this,r,s);return c?e.call(this,r,c,i):e.call(this,r,s,i)}}_getPatchableEventTargets(){return window.EventTarget?[EventTarget.prototype]:[Node.prototype,Window.prototype]}_patchHistoryApi(){this._unpatchHistoryApi(),this._wrap(history,"replaceState",this._patchHistoryMethod()),this._wrap(history,"pushState",this._patchHistoryMethod()),this._wrap(history,"back",this._patchHistoryMethod()),this._wrap(history,"forward",this._patchHistoryMethod()),this._wrap(history,"go",this._patchHistoryMethod())}_patchHistoryMethod(){const t=this;return e=>function(...r){const s=`${location.pathname}${location.hash}${location.search}`,i=e.apply(this,r),c=`${location.pathname}${location.hash}${location.search}`;return s!==c&&t._updateInteractionName(c),i}}_unpatchHistoryApi(){h(history.replaceState)&&this._unwrap(history,"replaceState"),h(history.pushState)&&this._unwrap(history,"pushState"),h(history.back)&&this._unwrap(history,"back"),h(history.forward)&&this._unwrap(history,"forward"),h(history.go)&&this._unwrap(history,"go")}_updateInteractionName(t){const e=T.getSpan(m.active());e&&typeof e.updateName=="function"&&e.updateName(`${Bt} ${t}`)}_patchZoneCancelTask(){const t=this;return e=>function(r){const s=Zone.current,i=t._getCurrentSpan(s);return i&&t._shouldCountTask(r,s)&&t._decrementTask(i),e.call(this,r)}}_patchZoneScheduleTask(){const t=this;return e=>function(r){const s=Zone.current,i=t._getCurrentSpan(s);return i&&t._shouldCountTask(r,s)&&(t._incrementTask(i),t._checkForTimeout(r,i)),e.call(this,r)}}_patchZoneRunTask(){const t=this;return e=>function(r,s,i){const c=Array.isArray(i)&&i[0]instanceof Event?i[0]:void 0,u=c==null?void 0:c.target;let l;const _=this;if(u){if(l=t._createSpan(u,r.eventName),l)return t._incrementTask(l),_.run(()=>{try{return m.with(T.setSpan(m.active(),l),()=>{const d=Zone.current;return r._zone=d,e.call(d,r,s,i)})}finally{t._decrementTask(l)}})}else l=t._getCurrentSpan(_);try{return e.call(_,r,s,i)}finally{l&&t._shouldCountTask(r,_)&&t._decrementTask(l)}}}_shouldCountTask(t,e){if(t._zone&&(e=t._zone),!e||!t.data||t.data.isPeriodic)return!1;const n=this._getCurrentSpan(e);return!n||!this._spansData.get(n)?!1:t.type==="macroTask"||t.type==="microTask"}_tryToEndSpan(t,e){t&&this._spansData.get(t)&&(t.end(e),this._spansData.delete(t))}enable(){const t=this.getZoneWithPrototype();E.debug("applying patch to",this.moduleName,this.version,"zone:",!!t),t?(h(t.prototype.runTask)&&(this._unwrap(t.prototype,"runTask"),E.debug("removing previous patch from method runTask")),h(t.prototype.scheduleTask)&&(this._unwrap(t.prototype,"scheduleTask"),E.debug("removing previous patch from method scheduleTask")),h(t.prototype.cancelTask)&&(this._unwrap(t.prototype,"cancelTask"),E.debug("removing previous patch from method cancelTask")),this._zonePatched=!0,this._wrap(t.prototype,"runTask",this._patchZoneRunTask()),this._wrap(t.prototype,"scheduleTask",this._patchZoneScheduleTask()),this._wrap(t.prototype,"cancelTask",this._patchZoneCancelTask())):(this._zonePatched=!1,this._getPatchableEventTargets().forEach(n=>{h(n.addEventListener)&&(this._unwrap(n,"addEventListener"),E.debug("removing previous patch from method addEventListener")),h(n.removeEventListener)&&(this._unwrap(n,"removeEventListener"),E.debug("removing previous patch from method removeEventListener")),this._wrap(n,"addEventListener",this._patchAddEventListener()),this._wrap(n,"removeEventListener",this._patchRemoveEventListener())})),this._patchHistoryApi()}disable(){const t=this.getZoneWithPrototype();E.debug("removing patch from",this.moduleName,this.version,"zone:",!!t),t&&this._zonePatched?(h(t.prototype.runTask)&&this._unwrap(t.prototype,"runTask"),h(t.prototype.scheduleTask)&&this._unwrap(t.prototype,"scheduleTask"),h(t.prototype.cancelTask)&&this._unwrap(t.prototype,"cancelTask")):this._getPatchableEventTargets().forEach(n=>{h(n.addEventListener)&&this._unwrap(n,"addEventListener"),h(n.removeEventListener)&&this._unwrap(n,"removeEventListener")}),this._unpatchHistoryApi()}getZoneWithPrototype(){return window.Zone}}const q="0.0.0";class qt extends b{constructor(t={}){const e="@opentelemetry/instrumentation-paint-timing";super(e,q,t);a(this,"component","paint-timing");a(this,"version","1");a(this,"moduleName",this.component);a(this,"_logEmitter");this._logEmitter=S.getLogEmitter(e,q)}init(){}enable(){const t=this;if(PerformanceObserver==null)return;new PerformanceObserver(n=>{n.getEntries().forEach(s=>{if(s.entryType==="paint"){const i={startTime:s.startTime};t._logEmitter.addEvent(s.name,i)}})}).observe({entryTypes:["paint"]})}disable(){}}const J="0.0.0";class Jt extends b{constructor(t={}){const e="@opentelemetry/instrumentation-paint-timing";super(e,J,t);a(this,"component","paint-timing");a(this,"version","1");a(this,"moduleName",this.component);a(this,"_logEmitter");this._logEmitter=S.getLogEmitter(e,J)}init(){}enable(){const t=this;wt(e=>{const n={value:e.value};t._logEmitter.addEvent("largest-contentful-paint",n)}),St(e=>{const n={inputDelay:e.value};t._logEmitter.addEvent("first-input",n)}),bt(e=>{const n={value:e.value};t._logEmitter.addEvent("content-layout-shift",n)})}disable(){}}function Z(o,t){return o.length>t?o.substring(0,t):o}const Qt=4096,Q=1024;function N(o){return o&&o.trim()!==""&&!o.startsWith("[object")&&o!=="error"}function tt(o){return o===void 0?"(undefined)":o.toString()}function et(o,t){t&&t.stack&&N(t.stack)&&(o["error.stack"]=Z(t.stack.toString(),Qt))}const nt="errors",rt="1";class te extends b{constructor(t){super(nt,rt,t);a(this,"_logEmitter");a(this,"_unhandledRejectionListener",t=>{this.report("unhandledrejection",t.reason)});a(this,"_errorListener",t=>{this.report("onerror",t)});a(this,"_documentErrorListener",t=>{this.report("eventListener.error",t)});this._logEmitter=S.getLogEmitter(nt,rt)}init(){}enable(){const t=this;z.wrap(console,"error",e=>(...n)=>(t.report("console.error",n),e.apply(t,n))),window.addEventListener("unhandledrejection",this._unhandledRejectionListener),window.addEventListener("error",this._errorListener),document.documentElement.addEventListener("error",this._documentErrorListener,{capture:!0})}disable(){z.unwrap(console,"error"),window.removeEventListener("unhandledrejection",this._unhandledRejectionListener),window.removeEventListener("error",this._errorListener),document.documentElement.removeEventListener("error",this._documentErrorListener,{capture:!0})}reportError(t,e){const n=e.message||e.toString();if(!N(n)&&!e.stack)return;const r=w(),s=this.tracer.startSpan(t,{startTime:r});s.setAttribute("component","error"),s.setAttribute("error",!0),s.setAttribute("error.object",N(e.name)?e.name:e.constructor&&e.constructor.name?e.constructor.name:"Error"),s.setAttribute("error.message",Z(n,Q)),et(s.attributes,e),s.end(r)}reportString(t,e,n){if(!N(e))return;const r=w(),s=this.tracer.startSpan(t,{startTime:r}),i={error:!0,["error.object"]:"String",["error.message"]:Z(e,Q)};n&&et(s,n),this._logEmitter.addEvent("error",i),s.end(r)}reportErrorEvent(t,e){e.error?this.report(t,e.error):e.message&&this.report(t,e.message)}reportEvent(t,e){if(!e.target&&!N(e.type))return;const n=w(),r=this.tracer.startSpan(t,{startTime:n});r.setAttribute("component","error"),r.setAttribute("error.type",e.type),e.target&&(r.setAttribute("target_element",e.target.tagName),r.setAttribute("target_xpath",pt(e.target,!0)),r.setAttribute("target_src",e.target.src)),r.end(n)}report(t,e){if(!(Array.isArray(e)&&e.length===0))if(e instanceof Array&&e.length===1&&(e=e[0]),e instanceof Error)this.reportError(t,e);else if(e instanceof ErrorEvent)this.reportErrorEvent(t,e);else if(e instanceof Event)this.reportEvent(t,e);else if(typeof e=="string")this.reportString(t,e);else if(e instanceof Array){const n=e.find(r=>r instanceof Error);this.reportString(t,e.map(r=>tt(r)).join(" "),n)}else this.reportString(t,tt(e))}}const st="splunk-visibility",ot="1";class ee extends b{constructor(t={}){super(st,ot,Object.assign({},t));a(this,"unloading");a(this,"visibilityListener");a(this,"unloadListener");this.unloading=!1,this._logEmitter=S.getLogEmitter(st,ot)}init(){}enable(){document.hidden&&this._createSpan(document.hidden),this.unloadListener=()=>{this.unloading=!0},this.visibilityListener=()=>{this.unloading||this._createSpan(document.hidden)},window.addEventListener("beforeunload",this.unloadListener),window.addEventListener("visibilitychange",this.visibilityListener)}disable(){window.removeEventListener("beforeunload",this.unloadListener),window.removeEventListener("visibilitychange",this.visibilityListener)}_createSpan(t){w(),this._logEmitter.addEvent("visibility",{hidden:t})}}const ht=new yt,ne=ht.generateSpanId();function it(){let o={"session.id":ht.generateTraceId(),"session.scriptInstance":ne};return console.log("New sessionId: ",o.sessionId),new V(o)}const lt={refreshSession:function(){var t;const o=(t=this.traceProvider)==null?void 0:t.resource.merge(it());this.traceProvider.resource=o,this.traceProvider._config.resource=o,this.traceProvider._tracers.forEach(e=>{e.resource=o})},init:function(){E.setLogger(new Nt);const o=it(),t=new Pt({resource:o});t.addSpanProcessor(new Rt(new At)),t.addSpanProcessor(new Ot(new jt)),t.register();const e=new Ut({resource:o});e.addLogProcessor(new X(new Ft)),e.addLogProcessor(new X(new Zt)),e.register(),It({instrumentations:[new $t,new Yt,new qt,new Jt,new te,new ee]}),this.traceProvider=t}};lt.init();const re=dt({props:{msg:null},setup(o){const t=B(0),e=B([]);function n(s){setTimeout(()=>{s.push("1234")},510)}function r(){console.error("test error")}return(s,i)=>(I(),C(U,null,[L("h1",null,x(o.msg),1),(I(!0),C(U,null,Ct(e.value,c=>(I(),C("li",null,x(c),1))),256)),L("button",{type:"button",onClick:i[0]||(i[0]=c=>t.value++)},"count is: "+x(t.value),1),L("button",{type:"button",onClick:i[1]||(i[1]=c=>n(e.value))},"layout shift"),L("button",{type:"button",onClick:r},"console error")],64))}});var se=Et(re,[["__scopeId","data-v-80d6450a"]]);const oe=dt({setup(o){function t(){window.open("./viewer/","otel-viewer","width=960,height=720")}function e(){lt.refreshSession()}return(n,r)=>(I(),C(U,null,[L("div",{class:"viewer-container"},[L("button",{onClick:t},"Open Viewer"),L("button",{onClick:e},"Refresh session")]),kt(se,{msg:"Hello World"})],64))}});Dt(oe).mount("#app");
