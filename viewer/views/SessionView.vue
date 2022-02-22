<script setup lang="ts">
import { toRef } from 'vue';
import { useOTLPData } from '../use/otlp-local-storage';

const props = defineProps<{
  sessionId: string
}>()

const storedData = useOTLPData(toRef(props, 'sessionId'));
</script>

<template>
  <div>
    <pre class="font-mono">{{ storedData.spans }}</pre>
  </div>
</template>