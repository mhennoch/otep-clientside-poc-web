const f=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}};f();const l="otlp_poc",a=`${l}!index`;function u(s,t){return`${l}_${t}_${s}`}function g(s){s.resourceSpans?s.resourceSpans.forEach(t=>{let o="0";if(t.resource){const n=t.resource.attributes.find(e=>e.key==="session.id");n&&(o=n.value.stringValue)}console.log("Storing data: ",o,t),c("spans",o,t)}):s.resourceLogs&&s.resourceLogs.forEach(t=>{let o="0";if(t.resource){const n=t.resource.attributes.find(e=>e.key==="session.id");n&&(o=n.value.stringValue)}c("logs",o,t)})}function c(s,t,o){const n=u(s,t);let e=localStorage.getItem(n),r;e?r=JSON.parse(e):r=[],r.push(o),localStorage.setItem(n,JSON.stringify(r)),d(t)}function d(s){const t=localStorage.getItem(a);let o;t?o=JSON.parse(t):o={},o[s]={lastData:Date.now()},localStorage.setItem(a,JSON.stringify(o))}var p=(s,t)=>{const o=s.__vccOpts||s;for(const[n,e]of t)o[n]=e;return o};export{a as I,p as _,u as g,g as s};