<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
const items = ref([])

function addItem(items) {
  setTimeout(() => {
    items.push('1234')
  }, 510)
}

function generateConsoleError() {
  console.error('test error')
}

</script>

<template>
  <h1>{{ msg }}</h1>

  <li v-for="item in items">
    {{ item }}
  </li>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <button type="button" @click="addItem(items)">layout shift</button>
  <button type="button" @click="generateConsoleError">console error</button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
