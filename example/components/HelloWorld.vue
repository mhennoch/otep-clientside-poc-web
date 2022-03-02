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

function fetchSomething() {  
  const url = 'https://www.random.org/integers/?num=10&min=1&max=6&col=1&base=10&format=plain&rnd=new'
  fetch(url).then( res => {
    res.json().then( json => {
      console.log('RNG ', json);
    })
  })
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
  <button type="button" @click="fetchSomething">Fetch</button>
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
