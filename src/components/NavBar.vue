<template>
  <nav class="shadow-md sticky top-0 z-50" style="background-color: #483146;">
    <div class="px-4 py-3 flex justify-between items-center">
      
      <!-- Logo - Link to home -->
      <router-link to="/" class="flex items-center space-x-2">
        <h1 class="text-xl font-bold text-white">Shopora</h1>
      </router-link>

      <!-- Navigation Links - Always visible -->
      <div class="flex items-center gap-6">
        <router-link to="/" class="text-white hover:text-yellow-200 transition">
          Home
        </router-link>
        <router-link to="/cart" class="text-white hover:text-yellow-200 transition flex items-center gap-2">
          <span>🛒 Cart</span>
          <span 
            v-if="cartCount > 0"
            class="bg-yellow-400 text-pink-700 rounded-full px-2 py-0.5 text-xs font-bold min-w-[20px] text-center"
          >
            {{ cartCount }}
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCart } from '../composables/useCart';

const { totalItems } = useCart();
const cartCount = computed(() => totalItems.value);
</script>