<template>
  <div class="bg-white rounded-xl shadow-md p-4 mb-6">
    <!-- Search Input -->
    <div class="mb-4">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          v-model="localSearchQuery"
          type="text"
          placeholder="Search products by name, brand, or category..."
          class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#634A61] focus:border-transparent"
          @input="applyFilters"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Category Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          v-model="localCategory"
          class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#634A61]"
          @change="applyFilters"
        >
          <option value="all">All Categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ formatCategory(cat) }}
          </option>
        </select>
      </div>

      <!-- Price Range Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Max Price: ${{ localMaxPrice }}</label>
        <input
          v-model.number="localMaxPrice"
          type="range"
          min="0"
          :max="props.maxPriceLimit"
          step="10"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#634A61]"
          @input="applyFilters"
        />
        <div class="flex justify-between text-xs text-gray-500 mt-1">
          <span>$0</span>
          <span>${{ props.maxPriceLimit }}</span>
        </div>
      </div>

      <!-- Rating Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Min Rating</label>
        <select
          v-model="localMinRating"
          class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#634A61]"
          @change="applyFilters"
        >
          <option :value="0">Any Rating</option>
          <option :value="4">4★ & above</option>
          <option :value="3">3★ & above</option>
          <option :value="2">2★ & above</option>
        </select>
      </div>
      
      <!-- Sort By Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
        <select
          v-model="localSortBy"
          class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#634A61]"
          @change="applyFilters"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
      </div>
    </div>

    <!-- Reset Button -->
    <div class="mt-4 flex justify-between items-center">
      <div class="text-sm text-gray-500">
        <span v-if="hasActiveFilters" class="text-[#634A61]">✓ Filters applied</span>
        <span v-else>No filters active</span>
      </div>
      <button 
        @click="resetFilters" 
        class="px-4 py-2 text-sm bg-[#634A61] text-white rounded-lg hover:bg-[#717566] transition-all duration-200"
      >
        Reset All Filters
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

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

// Local refs for two-way binding
const localSearchQuery = ref(props.modelValue.searchQuery)
const localCategory = ref(props.modelValue.category)
const localMaxPrice = ref(props.modelValue.maxPrice)
const localMinRating = ref(props.modelValue.minRating)
const localSortBy = ref(props.modelValue.sortBy)

// Check if any filters are active
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

const applyFilters = () => {
  emit('update:modelValue', {
    searchQuery: localSearchQuery.value,
    category: localCategory.value,
    maxPrice: localMaxPrice.value,
    minRating: localMinRating.value,
    sortBy: localSortBy.value
  })
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