<template>
  <div class="min-h-screen transition-all duration-500 flex flex-col" :class="isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-teal-50 via-cyan-50 to-orange-50'">
    
    <div class="container mx-auto px-4 py-4 max-w-5xl flex-1">
      
      <!-- Back Button - SMALLER -->
      <button 
        @click="$router.back()" 
        class="mb-3 flex items-center gap-1.5 transition-colors duration-300 rounded-full shadow-md hover:shadow-lg px-3 py-1.5 text-sm"
        :class="isDark ? 'bg-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-gray-900/80 backdrop-blur-sm text-teal-400 hover:text-teal-300 hover:bg-gray-700/80'"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back
      </button>
      
      <!-- Loading State - SMALLER -->
      <div v-if="loading" class="text-center py-10">
        <div class="relative inline-block">
          <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-500 border-r-4 border-cyan-500 border-b-4 border-orange-500 border-l-transparent"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-2xl animate-pulse">🛍️</span>
          </div>
        </div>
        <p class="mt-3 text-sm text-gray-400">Loading product details...</p>
      </div>

      <!-- Product Details - COMPACT -->
      <div v-else-if="product" class="rounded-2xl shadow-xl overflow-hidden transition-colors duration-300 bg-gray-800/90 backdrop-blur-sm border border-gray-700">
        <div class="grid md:grid-cols-2 gap-0">
          
          <!-- Left Column - Product Images (COMPACT) -->
          <div class="p-4 bg-gradient-to-r from-teal-300 to-cyan-400">
            <div class="relative group">
              <img 
                :src="currentImage || product.thumbnail" 
                :alt="product.title"
                class="w-full rounded-lg shadow-md object-cover aspect-square transition-transform duration-500 group-hover:scale-105"
              />
              <div v-if="product.discountPercentage" class="absolute top-2 left-2">
                <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-1.5 py-0.5 rounded-full text-xs font-bold shadow">
                  {{ Math.round(product.discountPercentage) }}% OFF
                </div>
              </div>
            </div>
            
            <!-- Thumbnails - COMPACT -->
            <div v-if="product.images && product.images.length > 0" class="flex gap-2 mt-3 overflow-x-auto pb-1">
              <img 
                v-for="(img, idx) in product.images.slice(0, 4)" 
                :key="idx"
                :src="img"
                :alt="`${product.title} ${idx + 1}`"
                class="w-12 h-12 object-cover rounded-lg cursor-pointer transition-all duration-200 hover:scale-105"
                :class="[
                  currentImage === img ? 'ring-2 ring-teal-500 shadow-md' : 'opacity-60 hover:opacity-100'
                ]"
                @click="currentImage = img"
              />
            </div>
          </div>

          <!-- Right Column - Product Info (COMPACT) -->
          <div class="p-4 lg:p-5">
            <!-- Brand -->
            <div class="mb-2">
              <span class="text-xs uppercase tracking-wider rounded-full px-2 py-0.5 transition-colors duration-300 bg-gradient-to-r from-teal-900/50 to-cyan-900/50 text-teal-400 border border-teal-800">
                {{ product.brand }}
              </span>
            </div>
            
            <!-- Title -->
            <h1 class="text-xl lg:text-2xl font-bold mb-2 leading-tight text-white">
              {{ product.title }}
            </h1>
            
            <!-- Rating -->
            <div class="flex items-center gap-2 mb-3">
              <div class="flex items-center gap-0.5">
                <span class="text-yellow-400 text-sm">★</span>
                <span class="font-semibold text-sm text-white">{{ product.rating }}</span>
                <span class="text-xs text-gray-400 ml-1">({{ product.stock }} left)</span>
              </div>
            </div>
            
            <!-- Price -->
            <div class="mb-3">
              <div class="flex items-baseline gap-2">
                <span class="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  ${{ product.price }}
                </span>
                <span v-if="originalPrice" class="text-gray-500 line-through text-sm">
                  ${{ originalPrice }}
                </span>
              </div>
            </div>
            
            <!-- Description - SHORTER -->
            <div class="mb-3">
              <h3 class="text-sm font-semibold mb-1 text-gray-200">Description</h3>
              <p class="leading-relaxed text-gray-300 text-sm line-clamp-3">{{ product.description }}</p>
            </div>
            
            <!-- Product Details Grid - COMPACT -->
            <div class="grid grid-cols-2 gap-2 mb-3 p-2 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-400/50 border border-gray-700">
              <div>
                <span class="text-xs text-gray-400">Category</span>
                <p class="font-medium capitalize text-teal-400 text-sm">{{ product.category }}</p>
              </div>
              <div v-if="product.sku">
                <span class="text-xs text-gray-400">SKU</span>
                <p class="font-medium text-gray-300 text-sm">{{ product.sku }}</p>
              </div>
              <div v-if="product.warrantyInformation">
                <span class="text-xs text-gray-400">Warranty</span>
                <p class="font-medium text-gray-300 text-sm">{{ product.warrantyInformation }}</p>
              </div>
              <div v-if="product.shippingInformation">
                <span class="text-xs text-gray-400">Shipping</span>
                <p class="font-medium text-gray-300 text-sm">{{ product.shippingInformation }}</p>
              </div>
            </div>
            
            <!-- Quantity - COMPACT -->
            <div class="mb-3">
              <label class="block text-xs font-medium mb-1 text-gray-300">Quantity</label>
              <div class="flex items-center gap-2">
                <button @click="quantity > 1 && quantity--" class="w-7 h-7 rounded-full transition-all duration-200 text-base font-bold bg-gray-500 hover:bg-teal-500 text-white hover:scale-105">-</button>
                <span class="w-10 text-center text-base font-semibold text-white bg-gray-800 rounded py-0.5">{{ quantity }}</span>
                <button @click="quantity < product.stock && quantity++" class="w-7 h-7 rounded-full transition-all duration-200 text-base font-bold bg-gray-700 hover:bg-teal-600 text-white hover:scale-105">+</button>
              </div>
            </div>
            
            <!-- Add to Cart Button - COMPACT -->
            <button @click="handleAddToCart" class="w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2 text-sm bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white relative overflow-hidden group">
              <span class="relative z-10 flex items-center gap-1.5">🛒 Add to Cart</span>
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            
            <!-- Trust Badges - COMPACT -->
            <div class="mt-3 flex justify-center gap-4 text-xs text-gray-400">
              <div class="flex items-center gap-0.5"><span class="text-teal-400 text-xs">✓</span> Secure</div>
              <div class="flex items-center gap-0.5"><span class="text-teal-400 text-xs">🚚</span> Free Ship</div>
              <div class="flex items-center gap-0.5"><span class="text-teal-400 text-xs">↺</span> 30-Day</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State - COMPACT -->
      <div v-else class="text-center py-10 rounded-2xl shadow-lg transition-colors duration-300 bg-gray-600/90 backdrop-blur-sm border border-gray-700">
        <div class="text-6xl mb-3 animate-bounce">😢</div>
        <p class="text-orange-400 text-base mb-3">Product not found</p>
        <router-link to="/products" class="inline-block px-5 py-2 rounded-lg transition-all duration-200 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold text-sm hover:scale-105">
          Browse Products
        </router-link>
      </div>
    </div>

    <!-- Footer -->
    <FooterBar />
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import type { Product } from '../types'
import { useCart } from '../composables/useCart'
import { useDarkMode } from '../composables/useDarkMode'
import FooterBar from '../components/FooterBar.vue'

const route = useRoute()
const router = useRouter()
const { addToCart } = useCart()
const { isDark } = useDarkMode()

const product = ref<Product | null>(null)
const loading = ref(true)
const currentImage = ref('')
const quantity = ref(1)

const originalPrice = computed(() => {
  if (product.value && product.value.discountPercentage) {
    return Math.round(product.value.price / (1 - product.value.discountPercentage / 100))
  }
  return null
})

const handleAddToCart = () => {
  if (product.value) {
    addToCart(product.value, quantity.value)
    router.push('/cart')
  }
}

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
</script>

<style scoped>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>