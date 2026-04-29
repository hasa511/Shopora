<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDark ? 'bg-gray-900' : 'bg-gray-100'">
    
    <!-- Hero Section with New Background Image -->
    <div class="relative transition-colors duration-300">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://www.shutterstock.com/shutterstock/photos/2537666313/display_1500/stock-photo-glamorous-editorial-photo-girl-holding-shopping-bags-walking-in-a-high-end-shopping-mall-hall-2537666313.jpg" 
          alt="Shopping girls looking at store window in mall"
          class="w-full h-full object-cover object-center"
        />
        <!-- Dark Overlay for better text readability -->
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <!-- Hero Content - Previous padding and size -->
      <div class="relative z-10 container mx-auto px-4 py-32 md:py-40 lg:py-48 text-center">
        <div class="text-7xl md:text-8xl mb-6 drop-shadow-lg animate-bounce">🛍️</div>
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg">
          Welcome to Shopora
        </h1>
        <p class="text-xl md:text-2xl lg:text-3xl mb-4 text-white drop-shadow">
          Your Premier Shopping Destination
        </p>
        <p class="text-base md:text-lg mb-8 text-white drop-shadow opacity-90">
          Discover amazing products at unbeatable prices ✨
        </p>
       
        <button 
          @click="scrollToProducts"
          class="mt-6 px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105"
          :class="isDark ? 'bg-[#634A61] text-white hover:bg-[#7a5e78]' : 'bg-[#634A61] text-white hover:bg-[#483146]'"
        >
          Shop Now →
        </button>
      </div>
    </div>
    
    <!-- Products Section -->
    <div ref="productsSection" class="container mx-auto px-4 py-8">
      
      <!-- FilterBar with Previous Background Image -->
      <div class="relative rounded-xl overflow-hidden mb-6">
        <!-- Background Image for FilterBar -->
        <div class="absolute inset-0 z-0">
          <img 
            src="https://media.istockphoto.com/id/1347529406/photo/woman-carrying-some-shopping-bags-walking-on-a-city-street-black-friday.jpg?s=170667a&w=0&k=20&c=IEPDc4ZAnUC9-89Wsy2jRi7OcA9SuL15g5_ps9XRw1E=" 
            alt="Filter bar background"
            class="w-full h-full object-cover"
          />
          <!-- Light overlay for filter bar -->
          <div class="absolute inset-0" :class="isDark ? 'bg-gray-900 bg-opacity-85' : 'bg-white bg-opacity-85'"></div>
        </div>
        
        <!-- FilterBar Component -->
        <div class="relative z-10">
          <FilterBar 
            v-model="filterState"
            :maxPriceLimit="maxPriceLimit"
          />
        </div>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#634A61]"></div>
        <p class="mt-4" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Loading products...</p>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="text-center py-12">
        <p :class="isDark ? 'text-gray-400' : 'text-gray-500'">No products found</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id" 
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProducts } from '../composables/useProducts'
import { useDarkMode } from '../composables/useDarkMode'
import type { FilterState } from '../types'
import ProductCard from '../components/ProductCard.vue'
import FilterBar from '../components/FilterBar.vue'

const { products, loading, fetchProducts } = useProducts()
const { isDark } = useDarkMode()

const productsSection = ref<HTMLElement | null>(null)

const scrollToProducts = () => {
  if (productsSection.value) {
    productsSection.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const maxPriceLimit = computed(() => {
  if (products.value.length === 0) return 1000
  return Math.max(...products.value.map(p => p.price))
})

const filterState = ref<FilterState>({
  searchQuery: '',
  category: 'all',
  maxPrice: 1000,
  minRating: 0,
  sortBy: 'default'
})

const filteredProducts = computed(() => {
  let result = [...products.value]
  
  // Apply search filter
  if (filterState.value.searchQuery) {
    const q = filterState.value.searchQuery.toLowerCase()
    result = result.filter(p => p.title.toLowerCase().includes(q))
  }
  
  // Apply category filter
  if (filterState.value.category !== 'all') {
    result = result.filter(p => p.category === filterState.value.category)
  }
  
  // Apply price filter
  result = result.filter(p => p.price <= filterState.value.maxPrice)
  
  // Apply rating filter
  if (filterState.value.minRating > 0) {
    result = result.filter(p => p.rating >= filterState.value.minRating)
  }
  
  // Apply sorting
  if (filterState.value.sortBy === 'price-asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (filterState.value.sortBy === 'price-desc') {
    result.sort((a, b) => b.price - a.price)
  }
  
  return result
})

onMounted(() => {
  fetchProducts()
})
</script>