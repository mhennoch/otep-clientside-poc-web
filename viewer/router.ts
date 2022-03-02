import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import SessionList from './views/SessionList.vue';
import SessionView from './views/SessionView.vue';
import SessionTimeline from './views/SessionTimeline.vue';

const routes: RouteRecordRaw[] = [
  {path: '/', name: 'session.list', component: SessionList},
  {path: '/view/:sessionId', name: 'session.view', component: SessionView, props: true},
  {path: '/timeline/:sessionId', name: 'session.timeline', component: SessionTimeline, props: true},
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
