<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-50 to-purple-50'">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      
      <!-- Back Button -->
      <button 
        @click="$router.back()" 
        class="mb-6 flex items-center gap-2 transition-colors duration-300 rounded-full shadow-md hover:shadow-lg px-4 py-2"
        :class="isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-[#634A61] hover:text-[#483146]'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Products
      </button>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-[#634A61]"></div>
        <p class="mt-6 text-lg transition-colors duration-300" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
          Loading product details...
        </p>
      </div>

      <!-- Product Details -->
      <div v-else-if="product" class="rounded-3xl shadow-2xl overflow-hidden transition-colors duration-300" :class="isDark ? 'bg-gray-800' : 'bg-white'">
        <div class="grid md:grid-cols-2 gap-0">
          
          <!-- Left Column - Product Images -->
          <div class="p-8" :class="isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-100 to-purple-100'">
            <!-- Main Image -->
            <div class="relative">
              <img 
                :src="currentImage || product.thumbnail" 
                :alt="product.title"
                class="w-full rounded-xl shadow-xl object-cover aspect-square"
              />
              
              <!-- Discount Badge -->
              <div v-if="product.discountPercentage" class="absolute top-4 left-4">
                <div class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  {{ Math.round(product.discountPercentage) }}% OFF
                </div>
              </div>
            </div>
            
            <!-- Thumbnail Gallery -->
            <div v-if="product.images && product.images.length > 0" class="flex gap-3 mt-6 overflow-x-auto pb-2">
              <img 
                v-for="(img, idx) in product.images" 
                :key="idx"
                :src="img"
                :alt="`${product.title} ${idx + 1}`"
                class="w-20 h-20 object-cover rounded-xl cursor-pointer transition-all duration-200 hover:scale-105"
                :class="[
                  currentImage === img ? 'ring-2 ring-[#634A61] shadow-lg' : 'opacity-70 hover:opacity-100',
                  isDark ? 'bg-gray-700' : ''
                ]"
                @click="currentImage = img"
              />
            </div>
          </div>

          <!-- Right Column - Product Info -->
          <div class="p-8 lg:p-10">
            <!-- Brand -->
            <div class="mb-4">
              <span class="text-sm uppercase tracking-wider rounded-full px-3 py-1 transition-colors duration-300" :class="isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'">
                {{ product.brand }}
              </span>
            </div>
            
            <!-- Title -->
            <h1 class="text-3xl lg:text-4xl font-bold mb-4 leading-tight transition-colors duration-300" :class="isDark ? 'text-white' : 'text-gray-800'">
              {{ product.title }}
            </h1>
            
            <!-- Rating Section -->
            <div class="flex items-center gap-4 mb-6">
              <div class="flex items-center gap-1">
                <span class="text-yellow-400 text-xl">★</span>
                <span class="font-bold text-lg transition-colors duration-300" :class="isDark ? 'text-white' : 'text-gray-800'">
                  {{ product.rating }}
                </span>
                <span class="transition-colors duration-300" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                  ({{ product.stock }} in stock)
                </span>
              </div>
            </div>
            
            <!-- Price Section -->
            <div class="mb-6">
              <div class="flex items-baseline gap-3">
                <span class="text-4xl lg:text-5xl font-bold transition-colors duration-300" :class="isDark ? 'text-yellow-400' : 'text-[#634A61]'">
                  ${{ product.price }}
                </span>
                <span v-if="originalPrice" class="text-gray-400 line-through text-xl">
                  ${{ originalPrice }}
                </span>
              </div>
            </div>
            
            <!-- Description -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold mb-3 transition-colors duration-300" :class="isDark ? 'text-white' : 'text-gray-800'">
                Description
              </h3>
              <p class="leading-relaxed transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
                {{ product.description }}
              </p>
            </div>
            
            <!-- Product Details Grid -->
            <div class="mb-8 p-4 rounded-xl transition-colors duration-300" :class="isDark ? 'bg-gray-700' : 'bg-gray-50'">
              <div>
                <span class="text-xs transition-colors duration-300" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Category</span>
                <p class="font-medium capitalize transition-colors duration-300" :class="isDark ? 'text-white' : 'text-gray-800'">
                  {{ product.category }}
                </p>
              </div>
            </div>
            
            <!-- Add to Cart Button -->
            <button 
              @click="handleAddToCart"
              class="w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 text-lg"
              :class="isDark ? 'bg-[#634A61] hover:bg-[#7a5e78] text-white' : 'bg-[#634A61] hover:bg-[#483146] text-white'"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="text-center py-20 rounded-3xl shadow-lg transition-colors duration-300" :class="isDark ? 'bg-gray-800' : 'bg-white'">
        <div class="text-6xl mb-4">😢</div>
        <p class="text-red-500 text-lg mb-4">Product not found</p>
        <button @click="$router.push('/')" class="px-6 py-3 rounded-xl transition-colors duration-300" :class="isDark ? 'bg-[#634A61] hover:bg-[#7a5e78] text-white' : 'bg-[#634A61] hover:bg-[#483146] text-white'">
          Go Back Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import type { Product } from '../types'
import { useCart } from '../composables/useCart'
import { useDarkMode } from '../composables/useDarkMode'

const route = useRoute()
const router = useRouter()
const { addToCart } = useCart()
const { isDark } = useDarkMode()

const product = ref<Product | null>(null)
const loading = ref(true)
const currentImage = ref('')

const originalPrice = computed(() => {
  if (product.value && product.value.discountPercentage) {
    return Math.round(product.value.price / (1 - product.value.discountPercentage / 100))
  }
  return null
})

onMounted(async () => {
  try {
    loading.value = true
    const id = route.params.id
    const response = await axios.get(`https://dummyjson.com/products/${id}`)
    product.value = response.data
    if (product.value) {
      currentImage.value = product.value.thumbnail
    }
  } catch (error) {
    console.error('Failed to load product:', error)
    product.value = null
  } finally {
    loading.value = false
  }
})

const handleAddToCart = () => {
  if (product.value) {
    addToCart(product.value, 1)
    router.push('/cart')
  }
}
</script>

<style scoped>
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: #634A61 #f1f1f1;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #634A61;
  border-radius: 10px;
}
</style>