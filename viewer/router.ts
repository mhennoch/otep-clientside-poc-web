import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import SessionList from './views/SessionList.vue';
import SessionView from './views/SessionView.vue';

const routes: RouteRecordRaw[] = [
  {path: '/', name: 'session.list', component: SessionList},
  {path: '/view/:sessionId', name: 'session.view', component: SessionView, props: true},
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
