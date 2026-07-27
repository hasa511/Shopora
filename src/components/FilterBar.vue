<template>
  <div class="rounded-xl shadow-md p-4 mb-6 transition-colors duration-300" :class="isDark ? 'bg-gray-800/50' : 'bg-white/50'">
    <div class="mb-4">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 transition-colors duration-300" :class="isDark ? 'text-gray-400' : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          v-model="localSearchQuery"
          type="text"
          placeholder="Search luxury products by brand, name, or category..."
          class="w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          :class="isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'"
          @input="handleSearchInput"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="block text-sm font-medium mb-2 transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
          Category
        </label>
        <select
          v-model="localCategory"
          class="w-full px-3 py-2 rounded-lg border transition-colors duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          :class="isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'"
          @change="handleCategoryChange"
        >
          <option value="all">All Categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ formatCategory(cat) }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2 transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
          Max Price: ${{ localMaxPrice }}
        </label>
        <input
          v-model.number="localMaxPrice"
          type="range"
          min="0"
          :max="props.maxPriceLimit"
          step="100"
          class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-teal-500"
          :class="isDark ? 'bg-gray-700' : 'bg-gray-200'"
          @input="handlePriceChange"
        />
        <div class="flex justify-between text-xs mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
          <span>$0</span>
          <span>${{ props.maxPriceLimit }}</span>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2 transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
          Minimum Rating
        </label>
        <select
          v-model="localMinRating"
          class="w-full px-3 py-2 rounded-lg border transition-colors duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          :class="isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'"
          @change="handleRatingChange"
        >
          <option :value="0">Any Rating</option>
          <option :value="4">4★ & above</option>
          <option :value="3">3★ & above</option>
          <option :value="2">2★ & above</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2 transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
          Sort By
        </label>
        <select
          v-model="localSortBy"
          class="w-full px-3 py-2 rounded-lg border transition-colors duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          :class="isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'"
          @change="handleSortChange"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>

    <div class="mt-4 flex justify-between items-center">
      <div class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
        <span v-if="hasActiveFilters" class="text-teal-500">✓ Filters applied</span>
        <span v-else>No filters active</span>
      </div>
      <button 
        @click="resetFilters" 
        class="px-4 py-2 text-sm rounded-lg transition-all duration-200 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
      >
        Reset All Filters
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark } = useDarkMode()

const categories = ['beauty', 'fragrances', 'furniture', 'skincare', 'tops', 'womens-dresses']

const props = defineProps<{
  modelValue: {
    searchQuery: string
    category: string
    maxPrice: number
    minRating: number
    sortBy: string
  }
  maxPriceLimit: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: any]
}>()

// Local refs
const localSearchQuery = ref(props.modelValue.searchQuery)
const localCategory = ref(props.modelValue.category)
const localMaxPrice = ref(props.modelValue.maxPrice)
const localMinRating = ref(props.modelValue.minRating)
const localSortBy = ref(props.modelValue.sortBy)

const hasActiveFilters = computed(() => {
  return localSearchQuery.value !== '' ||
         localCategory.value !== 'all' ||
         localMaxPrice.value < props.maxPriceLimit ||
         localMinRating.value > 0 ||
         localSortBy.value !== 'default'
})

const formatCategory = (cat: string) => {
  const names: Record<string, string> = {
    'beauty': 'Beauty',
    'fragrances': 'Fragrances',
    'furniture': 'Furniture',
    'skincare': 'Skincare',
    'tops': 'Tops',
    'womens-dresses': "Women's Dresses"
  }
  return names[cat] || cat
}

// Apply filters immediately
const applyFilters = () => {
  emit('update:modelValue', {
    searchQuery: localSearchQuery.value,
    category: localCategory.value,
    maxPrice: localMaxPrice.value,
    minRating: localMinRating.value,
    sortBy: localSortBy.value
  })
}

// Individual handlers for immediate updates
const handleSearchInput = () => {
  applyFilters()
}

const handleCategoryChange = () => {
  applyFilters()
}

const handlePriceChange = () => {
  applyFilters()
}

const handleRatingChange = () => {
  applyFilters()
}

const handleSortChange = () => {
  applyFilters()
}

const resetFilters = () => {
  localSearchQuery.value = ''
  localCategory.value = 'all'
  localMaxPrice.value = props.maxPriceLimit
  localMinRating.value = 0
  localSortBy.value = 'default'
  applyFilters()
}

// Watch for external changes to modelValue
watch(() => props.modelValue, (newVal) => {
  localSearchQuery.value = newVal.searchQuery
  localCategory.value = newVal.category
  localMaxPrice.value = newVal.maxPrice
  localMinRating.value = newVal.minRating
  localSortBy.value = newVal.sortBy
}, { deep: true })
</script>

<style scoped>
.accent-teal-500 {
  accent-color: #14b8a6;
}
.text-teal-500 {
  color: #14b8a6;
}
.bg-gradient-to-r {
  background-image: linear-gradient(to right, #14b8a6, #06b6d4);
}
.hover\:from-teal-700:hover {
  --tw-gradient-from: #0f766e;
}
.hover\:to-cyan-700:hover {
  --tw-gradient-to: #0891b2;
}
.focus\:ring-teal-500:focus {
  --tw-ring-color: #14b8a6;
}
</style>