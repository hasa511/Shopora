<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      
      <!-- Back Button -->
      <button 
        @click="$router.back()" 
        class="mb-6 flex items-center gap-2 text-[#634A61] hover:text-[#483146] transition-colors bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Products
      </button>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-[#634A61]"></div>
        <p class="mt-6 text-gray-500 text-lg">Loading product details...</p>
      </div>

      <!-- Product Details -->
      <div v-else-if="product" class="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div class="grid md:grid-cols-2 gap-0">
          
          <!-- Left Column - Product Images -->
          <div class="bg-gradient-to-br from-pink-100 to-purple-100 p-8">
            <!-- Main Image -->
            <div class="relative">
              <img 
                :src="currentImage || product.thumbnail" 
                :alt="product.title"
                class="w-full rounded-2xl shadow-xl object-cover aspect-square"
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
                :class="currentImage === img ? 'ring-2 ring-[#634A61] shadow-lg' : 'opacity-70 hover:opacity-100'"
                @click="currentImage = img"
              />
            </div>
          </div>

          <!-- Right Column - Product Info -->
          <div class="p-8 lg:p-10">
            <!-- Brand -->
            <div class="mb-4">
              <span class="text-sm text-gray-500 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">
                {{ product.brand }}
              </span>
            </div>
            
            <!-- Title -->
            <h1 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
              {{ product.title }}
            </h1>
            
            <!-- Rating Section -->
            <div class="flex items-center gap-4 mb-6">
              <div class="flex items-center gap-1">
                <span class="text-yellow-400 text-xl">★</span>
                <span class="font-bold text-gray-800 text-lg">{{ product.rating }}</span>
                <span class="text-gray-500">({{ product.stock }} in stock)</span>
              </div>
              
            </div>
            
            <!-- Price Section -->
            <div class="mb-6">
              <div class="flex items-baseline gap-3">
                <span class="text-4xl lg:text-5xl font-bold text-[#634A61]">
                  ${{ product.price }}
                </span>
                <span v-if="originalPrice" class="text-gray-400 line-through text-xl">
                  ${{ originalPrice }}
                </span>
              </div>
             
            </div>
            
            <!-- Description -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-gray-800 mb-3">Description</h3>
              <p class="text-gray-600 leading-relaxed">
                {{ product.description }}
              </p>
            </div>
            
            <!-- Product Details Grid - REMOVED SKU, Warranty, Shipping -->
            <div class="mb-8 p-4 bg-gray-50 rounded-xl">
              <div>
                <span class="text-xs text-gray-500">Category</span>
                <p class="font-medium text-gray-800 capitalize">{{ product.category }}</p>
              </div>
            </div>
            
            <!-- Add to Cart Button -->
            <button 
              @click="handleAddToCart"
              class="w-full bg-[#634A61] hover:bg-[#483146] text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 text-lg"
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
      <div v-else class="text-center py-20 bg-white rounded-3xl shadow-lg">
        <div class="text-6xl mb-4">😢</div>
        <p class="text-red-500 text-lg mb-4">Product not found</p>
        <button @click="$router.push('/')" class="bg-[#634A61] text-white px-6 py-3 rounded-xl hover:bg-[#483146] transition">
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

const route = useRoute()
const router = useRouter()
const { addToCart } = useCart()

const product = ref<Product | null>(null)
const loading = ref(true)
const currentImage = ref('')

const originalPrice = computed(() => {
  if (product.value && product.value.discountPercentage) {
    return Math.round(product.value.price / (1 - product.value.discountPercentage / 100))
  }
  return null
})

const savedAmount = computed(() => {
  if (originalPrice.value && product.value) {
    return (originalPrice.value - product.value.price).toFixed(2)
  }
  return 0
})

onMounted(async () => {
  try {
    loading.value = true
    const id = route.params.id
    const response = await axios.get(`https://dummyjson.com/products/${id}`)
    product.value = response.data
    currentImage.value = product.value.thumbnail
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