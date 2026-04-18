<template>
  <nav class="shadow-md" style="background-color: #4B5E41;">
    <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
      
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        
        <h1 class="text-xl font-bold text-white">Shopora</h1>
      </div>

      <!-- Desktop Menu -->
      <ul class="hidden md:flex space-x-6 font-medium text-white">
        <li>
          <router-link to="/" class="hover:text-yellow-200 transition">Home</router-link>
        </li>
        <li>
          <router-link to="/products" class="hover:text-yellow-200 transition">Products</router-link>
        </li>
        <li>
          <router-link to="/cart" class="hover:text-yellow-200 transition flex items-center gap-1">
            🛒 Cart
            <span class="bg-yellow-400 text-pink-700 rounded-full px-1.5 py-0.5 text-xs font-bold">0</span>
          </router-link>
        </li>
        <li>
          <router-link to="/about" class="hover:text-yellow-200 transition">About</router-link>
        </li>
      </ul>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden text-2xl text-white">
        ☰
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden px-4 pb-4" style="background-color: #4B5E41;">
      <ul class="space-y-3 font-medium text-white">
        <li>
          <router-link to="/" @click="toggleMenu" class="hover:text-yellow-200 block">Home</router-link>
        </li>
        <li>
          <router-link to="/products" @click="toggleMenu" class="hover:text-yellow-200 block">Products</router-link>
        </li>
        <li>
          <router-link to="/cart" @click="toggleMenu" class="hover:text-yellow-200 block flex items-center gap-1">
            Cart
            <span class="bg-yellow-400 text-pink-700 rounded-full px-1.5 py-0.5 text-xs font-bold">0</span>
          </router-link>
        </li>
        <li>
          <router-link to="/about" @click="toggleMenu" class="hover:text-yellow-200 block">About</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);
const cartCount = ref(0);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>