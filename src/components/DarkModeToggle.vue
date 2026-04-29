<template>
  <button
    @click="handleToggle"
    class="relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    :class="isDark ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'"
    :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
  >
    <span class="text-xl">
      {{ isDark ? '🌙' : '☀️' }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()

// Handle toggle with immediate effect
const handleToggle = () => {
  console.log('🔘 Toggle button clicked')
  toggleDarkMode()
}
</script>