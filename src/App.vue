<template>
  <div>
    <NavBar />
    <div class="container mx-auto px-4 py-16 text-center">
      <div class="text-6xl mb-4">🛍️</div>
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Shopora</h1>
      <p class="text-gray-600 text-lg mb-2">Your Premier Shopping Destination</p>
      <p class="text-gray-500 max-w-md mx-auto">
        Welcome to Shopora - where quality meets affordability. Discover amazing products at unbeatable prices.
      </p>
      <button 
        class="mt-6 text-white px-6 py-2 rounded-full transition"
        style="background-color: #583E4B;"
        @mouseover="event => event.target.style.backgroundColor = '#4B5E41'"
        @mouseout="event => event.target.style.backgroundColor = '#695A70'"
      >
        Shop Now
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>