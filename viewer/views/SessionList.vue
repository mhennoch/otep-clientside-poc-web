<script setup lang="ts">
import { computed, shallowReadonly } from 'vue';
import { useLocalStorage } from "@vueuse/core";
import { UseTimeAgo } from '@vueuse/components'

import { INDEX_KEY, IndexData } from '../../src/local-storage-exporter/storage';

const sessionIndex = shallowReadonly(useLocalStorage<Record<string, IndexData>>(INDEX_KEY, {}, {
  deep: false,
  shallow: true,
  writeDefaults: false,
}));

const sessions = computed(() => {
  const items = Object.entries(sessionIndex.value).map(([sessionId, data]) => ({
    sessionId,
    lastDataTime: new Date(data.lastData),
    ...data
  }));

  return items.sort((a, b) => b.lastData - a.lastData);
});
</script>

<template>
  <div class="p-2">
    <ul class="list-disc ml-6">
      <li v-for="session in sessions">
        {{ session.sessionId }}
        <span class="text-sm">
          (<UseTimeAgo v-slot="{ timeAgo }" :time="session.lastDataTime">{{ timeAgo }}</UseTimeAgo>)
        </span>
        <RouterLink :to="{name: 'session.view', params: {sessionId: session.sessionId}}">
          raw data
        </RouterLink>
        |
        <RouterLink :to="{name: 'session.timeline', params: {sessionId: session.sessionId}}">
          timeline 
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
