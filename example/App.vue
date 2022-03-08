<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import ExampleOtelBundle from './otel'

function openViewer() {
  window.open('./viewer/', 'otel-viewer', 'width=960,height=720')
}

function refreshSession() {
  ExampleOtelBundle.refreshSession();
}

</script>

<template>
  <div class="viewer-container">
    <button @click="openViewer">Open Viewer</button>
    <button @click="refreshSession">Refresh session</button>
  </div>
  <div>
    Hard navigations:
    <router-link to="/">home</router-link> | 
    <router-link to="/page2">page 2</router-link>
  </div>
  <div>
    Route changes:
    <a href="/">home</a> | 
    <a href="/page2">page 2</a>
  </div>

  <HelloWorld msg="" />
  <br>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.viewer-container {
  position: absolute;
  right: 1rem;
  top: 1rem;
}
</style>
