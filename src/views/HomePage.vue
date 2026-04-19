<template>
  <div class="min-h-screen bg-gray-100">
    
    <!-- Hero Section -->
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
        style="background-color: #8576A5;"
        @mouseover="event => event.target.style.backgroundColor = '#583E4B'"
        @mouseout="event => event.target.style.backgroundColor = '#583E4B'"
      >
        Shop Now
      </button>
    </div>
  </div>
    
    <!-- Products Section -->
    <div class="container mx-auto px-3 py-4">
      <div v-if="loading" class="text-center py-2">
        <div class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-pink-600"></div>
      </div>
      
      <div v-else-if="error" class="text-center py-2">
        <p class="text-red-500 text-xs">{{ error }}</p>
        <button @click="fetchProducts" class="mt-1 bg-pink-600 text-white px-3 py-1 rounded text-xs">Retry</button>
      </div>
      
      <!-- Products Grid -->
      <div v-else class="grid grid-cols-4 gap-4">
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          style="border: 1.5px solid #9EA094;"
        >
          <!-- Only Image - Smaller -->
          <div class="w-full" style="background-color: #BCB6B6;">
            <img 
              :src="product.thumbnail" 
              :alt="product.title"
              class="w-full h-50 object-cover mix-blend-multiply"
            />
          </div>
          
          <div class="p-2 text-center">
            <!-- Category -->
            <div class="flex justify-center mb-1">
              <span class="text-[8px] text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full uppercase tracking-wider font-medium">
                {{ product.category }}
              </span>
            </div>
            
            <!-- Title -->
            <h3 class="font-semibold text-[10px] text-gray-800 leading-tight">{{ product.title }}</h3>
            
            <!-- Brand -->
            <p class="text-[8px] text-gray-400 mt-0.5">{{ product.brand }}</p>
            
            <!-- Rating -->
            <div class="flex items-center justify-center gap-1 mt-1">
              <span class="text-yellow-400 text-[9px]">★</span>
              <span class="text-[8px] text-gray-600">{{ product.rating }}</span>
              <span class="text-[7px] text-gray-400">({{ product.stock }} left)</span>
            </div>
            
            <!-- Price -->
            <div class="mt-1.5">
              <span class="text-pink-600 font-bold text-base">${{ product.price }}</span>
              <span v-if="product.discountPercentage > 0" class="text-gray-400 line-through text-[8px] ml-1">
                ${{ Math.round(product.price / (1 - product.discountPercentage/100)) }}
              </span>
            </div>
            
            <!-- Button -->
            <div class="flex justify-center mt-2">
              <button 
               class="text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
               style="background-color: #D69E95;"
               @mouseover="event => event.target.style.backgroundColor = '#4B3E52'"
               @mouseout="event => event.target.style.backgroundColor = '#5F4E67'"
>
  🛒 Add to Cart
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProducts } from '../composables/useProducts'

const { products, loading, error, fetchProducts } = useProducts()

onMounted(() => {
  fetchProducts()
})
</script>