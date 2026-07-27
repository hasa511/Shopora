<template>
  <div :class="isDark ? 'dark' : ''" class="min-h-screen flex flex-col">
    <NavBar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import { useAuth } from './composables/useAuth'
import { useDarkMode } from './composables/useDarkMode'

const { checkAuth } = useAuth()
const { isDark, initDarkMode } = useDarkMode()

checkAuth()
initDarkMode()

import { watch } from 'vue'
watch(isDark, (newVal) => {
  console.log('App.vue - Dark mode changed to:', newVal)
})
</script>