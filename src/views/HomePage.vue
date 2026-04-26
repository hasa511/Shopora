<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
      <div class="container mx-auto px-4 text-center">
        <div class="text-6xl mb-4">🛍️</div>
        <h1 class="text-5xl font-bold text-gray-800 mb-4">Welcome to Shopora</h1>
        <p class="text-gray-600 text-lg mb-2">Your Premier Shopping Destination</p>
       
        <button 
          @click="scrollToProducts"
          class="mt-6 bg-[#634A61] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Shop Now
        </button>
      </div>
    </div>
    
    <!-- Products Section -->
    <div ref="productsSection" class="container mx-auto px-4 py-8">
      
      <!-- Filter Bar -->
      <FilterBar 
        v-model="filterState"
        :maxPriceLimit="maxPriceLimit"
      />

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#634A61]"></div>
        <p class="mt-4 text-gray-500">Loading products...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-500">{{ error }}</p>
        <button @click="fetchProducts" class="mt-4 bg-[#634A61] text-white px-6 py-2 rounded-lg">
          Retry
        </button>
      </div>

      <!-- No Results -->
      <div v-else-if="filteredProducts.length === 0" class="text-center py-12">
        <p class="text-gray-500">No products found matching your filters</p>
        <button @click="resetAllFilters" class="mt-2 text-[#634A61] underline">Clear all filters</button>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id" 
          :product="product"
        />
      </div>
    </div>

    <!-- Product Modal -->
    <ProductModal 
      :isOpen="isModalOpen"
      :product="selectedProduct"
      @update:isOpen="isModalOpen = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProducts } from '../composables/useProducts'
import type { Product, FilterState } from '../types'
import ProductCard from '../components/ProductCard.vue'
import ProductModal from '../components/ProductModal.vue'
import FilterBar from '../components/FilterBar.vue'

const { products, loading, error, fetchProducts } = useProducts()

const productsSection = ref<HTMLElement | null>(null)

// Modal state
const isModalOpen = ref(false)
const selectedProduct = ref<Product | null>(null)

const scrollToProducts = () => {
  if (productsSection.value) {
    productsSection.value.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
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

const resetAllFilters = () => {
  filterState.value = {
    searchQuery: '',
    category: 'all',
    maxPrice: maxPriceLimit.value,
    minRating: 0,
    sortBy: 'default'
  }
}

const filteredProducts = computed(() => {
  let result = [...products.value]

  if (filterState.value.searchQuery) {
    const q = filterState.value.searchQuery.toLowerCase()
    result = result.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  }

  if (filterState.value.category !== 'all') {
    result = result.filter(p => p.category === filterState.value.category)
  }

  result = result.filter(p => p.price <= filterState.value.maxPrice)

  if (filterState.value.minRating > 0) {
    result = result.filter(p => p.rating >= filterState.value.minRating)
  }

  switch (filterState.value.sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating-desc':
      result.sort((a, b) => b.rating - a.rating)
      break
    default:
      result.sort((a, b) => a.id - b.id)
  }

  return result
})

onMounted(() => {
  fetchProducts()
})
</script>