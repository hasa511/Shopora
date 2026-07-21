<template>
  <!-- This div will react to dark mode changes immediately -->
  <div :class="isDark ? 'dark' : ''" class="min-h-screen flex flex-col">
    <NavBar />
    <router-view />
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
import { useAuth } from './composables/useAuth'
import { useDarkMode } from './composables/useDarkMode'

const { checkAuth } = useAuth()
const { isDark, initDarkMode } = useDarkMode()

checkAuth()
initDarkMode()

// Watch for dark mode changes and log
import { watch } from 'vue'
watch(isDark, (newVal) => {
  console.log('App.vue - Dark mode changed to:', newVal)
})
</script>