<template>
  <div class="min-h-screen transition-all duration-500 flex flex-col" :class="isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-teal-50 via-cyan-50 to-orange-50'">
    
    <!-- Page Header -->
    <div class="relative overflow-hidden bg-gradient-to-r from-teal-700 via-cyan-700 to-orange-700 py-20">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      <div class="relative z-10 container mx-auto px-4 text-center">
        <div class="inline-block mb-4">
          <span class="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold tracking-wide">
            🛍️ OUR COLLECTION
          </span>
        </div>
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-4">
          All <span class="bg-gradient-to-r from-teal-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">Products</span>
        </h1>
        <p class="text-white/90 text-lg max-w-2xl mx-auto">
          Discover our complete collection of premium products curated just for you
        </p>
      </div>
    </div>
    
    <!-- Filter Section -->
    <div class="container mx-auto px-4 py-8">
      <div class="relative rounded-3xl overflow-hidden mb-8 shadow-xl">
        <div class="absolute inset-0 z-0">
          <img src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1600" class="w-full h-full object-cover">
          <div class="absolute inset-0 backdrop-blur-md bg-white/80 dark:bg-gray-900/80"></div>
        </div>
        <div class="relative z-10 p-6">
          <FilterBar 
            v-model="filterState"
            :maxPriceLimit="maxPriceLimit"
          />
        </div>
      </div>
    </div>

    <!-- Active Filters -->
    <div v-if="hasActiveFilters" class="container mx-auto px-4 mb-4">
      <div class="flex flex-wrap gap-2">
        <span class="text-sm font-semibold" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Active Filters:</span>
        <span v-if="filterState.searchQuery" class="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-full text-sm flex items-center gap-1">
          🔍 {{ filterState.searchQuery }}
          <button @click="filterState.searchQuery = ''" class="hover:text-teal-900">✕</button>
        </span>
        <span v-if="filterState.category !== 'all'" class="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 rounded-full text-sm flex items-center gap-1">
          📁 {{ getCategoryLabel(filterState.category) }}
          <button @click="filterState.category = 'all'" class="hover:text-cyan-900">✕</button>
        </span>
        <span v-if="filterState.maxPrice < maxPriceLimit" class="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full text-sm flex items-center gap-1">
          💰 Up to ${{ filterState.maxPrice }}
          <button @click="filterState.maxPrice = maxPriceLimit" class="hover:text-orange-900">✕</button>
        </span>
        <span v-if="filterState.minRating > 0" class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-sm flex items-center gap-1">
          ⭐ {{ filterState.minRating }}+ Stars
          <button @click="filterState.minRating = 0" class="hover:text-yellow-900">✕</button>
        </span>
        <span v-if="filterState.sortBy !== 'default'" class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm flex items-center gap-1">
          📊 {{ getSortByLabel(filterState.sortBy) }}
          <button @click="filterState.sortBy = 'default'" class="hover:text-purple-900">✕</button>
        </span>
        <button @click="resetFilters" class="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm hover:bg-red-200 transition">
          Clear All ✕
        </button>
      </div>
    </div>

    <!-- Results Count -->
    <div class="container mx-auto px-4 mb-6">
      <p class="text-lg" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
        Showing <span class="font-bold text-teal-600">{{ filteredProducts.length }}</span> of 
        <span class="font-bold">{{ products.length }}</span> products
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-20">
      <div class="relative inline-block">
        <div class="animate-spin-3d rounded-full h-20 w-20 border-4 border-t-teal-600 border-r-cyan-600 border-b-orange-600 border-l-transparent"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-2xl animate-bounce">🛍️</span>
        </div>
      </div>
      <p class="mt-6 text-lg" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Loading amazing products...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredProducts.length === 0" class="text-center py-20 rounded-3xl" :class="isDark ? 'bg-gray-800/50' : 'bg-white/50'">
      <div class="text-8xl mb-6">🔍</div>
      <h3 class="text-3xl font-bold mb-3" :class="isDark ? 'text-white' : 'text-gray-800'">No Products Found</h3>
      <p class="text-lg mb-6" :class="isDark ? 'text-gray-400' : 'text-gray-500'">We couldn't find any products matching your criteria</p>
      <button @click="resetFilters" class="px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105">
        Reset All Filters
      </button>
    </div>

    <!-- Products Grid -->
    <div v-else class="container mx-auto px-4 py-6 flex-1">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="(product, index) in paginatedProducts" 
          :key="product.id"
          class="animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.05}s` }"
        >
          <ProductCard :product="product" />
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredProducts.length > 0" class="flex justify-center gap-2 mt-12">
        <button 
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          :class="isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'"
        >
          ← Previous
        </button>
        <div class="flex gap-2">
          <button 
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            class="w-10 h-10 rounded-lg transition-all"
            :class="currentPage === page 
              ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white' 
              : (isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100')"
          >
            {{ page }}
          </button>
        </div>
        <button 
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          :class="isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'"
        >
          Next →
        </button>
      </div>
    </div>

    <!-- Footer -->
    <FooterBar />
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '../composables/useProducts'
import { useDarkMode } from '../composables/useDarkMode'
import type { FilterState } from '../types'
import ProductCard from '../components/ProductCard.vue'
import FilterBar from '../components/FilterBar.vue'
import FooterBar from '../components/FooterBar.vue'

const route = useRoute()
const { products, loading, fetchProducts } = useProducts()
const { isDark } = useDarkMode()

const currentPage = ref(1)
const itemsPerPage = 12

const maxPriceLimit = computed(() => {
  if (products.value.length === 0) return 2000
  return Math.max(...products.value.map(p => p.price), 1000)
})

const filterState = ref<FilterState>({
  searchQuery: '',
  category: 'all',
  maxPrice: maxPriceLimit.value,
  minRating: 0,
  sortBy: 'default'
})

const hasActiveFilters = computed(() => {
  return filterState.value.searchQuery !== '' ||
         filterState.value.category !== 'all' ||
         filterState.value.maxPrice < maxPriceLimit.value ||
         filterState.value.minRating > 0 ||
         filterState.value.sortBy !== 'default'
})

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    'beauty': 'Beauty',
    'fragrances': 'Fragrances',
    'furniture': 'Furniture',
    'skincare': 'Skincare',
    'tops': 'Tops',
    'womens-dresses': "Women's Dresses"
  }
  return labels[category] || category
}

const getSortByLabel = (sortBy: string) => {
  const labels: Record<string, string> = {
    'default': 'Featured',
    'price-asc': 'Price: Low to High',
    'price-desc': 'Price: High to Low',
    'rating': 'Top Rated'
  }
  return labels[sortBy] || sortBy
}

const resetFilters = () => {
  filterState.value = {
    searchQuery: '',
    category: 'all',
    maxPrice: maxPriceLimit.value,
    minRating: 0,
    sortBy: 'default'
  }
  currentPage.value = 1
}

const filteredProducts = computed(() => {
  let result = [...products.value]
  
  if (filterState.value.searchQuery) {
    const q = filterState.value.searchQuery.toLowerCase()
    result = result.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) ||
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
  
  if (filterState.value.sortBy === 'price-asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (filterState.value.sortBy === 'price-desc') {
    result.sort((a, b) => b.price - a.price)
  } else if (filterState.value.sortBy === 'rating') {
    result.sort((a, b) => b.rating - a.rating)
  }
  
  return result
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

watch([filterState, () => products.value.length], () => {
  currentPage.value = 1
})

onMounted(() => {
  fetchProducts()
  const categoryParam = route.query.category as string
  if (categoryParam && categoryParam !== 'all') {
    filterState.value.category = categoryParam
  }
})
</script>

<style scoped>
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes spin-3d {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
.animate-spin-3d { animation: spin-3d 1s linear infinite; }
</style>