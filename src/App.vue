<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import { useAuth } from './composables/useAuth'

// Initialize auth check when app starts
const { checkAuth } = useAuth()
checkAuth() // Ensure auth state is loaded
</script>