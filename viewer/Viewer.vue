<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col h-screen w-screen overflow-hidden">
    <div class="h-12 flex-initial flex border-gray-500 border-b">
      <router-link
        class="block p-2 bg-transparent hover:bg-gray-100 hover:text-gray-800"
        to="/"
        exact-active-class="bg-gray-100 text-blue-600 hover:text-blue-600"
      >
        Sessions List
      </router-link>
    </div>
    <div class="flex-1 overflow-auto">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
a {
  @apply text-blue-900;
}
a:hover {
  @apply text-blue-700;
}
</style>
