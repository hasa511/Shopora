<template>
  <div 
    class="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 flex flex-col h-full"
  >
    <div class="relative overflow-hidden bg-[#fdf2f8]  h-75 flex-shrink-0">
      <img 
        :src="product.thumbnail" 
        :alt="product.title"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
      />
      <div class="absolute top-2 right-2">
        <span class="bg-black text-white text-xs px-2 py-1 rounded-full">
          {{ product.category }}
        </span>
      </div>
    </div>
    
    <div class="p-4 flex-1 flex flex-col items-center text-center">
      <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">{{ product.brand }}</p>
      <h3 class="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">{{ product.title }}</h3>
      
      <div class="flex items-center justify-center gap-2 mb-2">
        <div class="flex items-center">
          <span class="text-yellow-400 text-sm">★</span>
          <span class="text-sm font-medium text-gray-700 ml-1">{{ product.rating }}</span>
        </div>
        <span class="text-xs text-gray-400">({{ product.stock }} left)</span>
      </div>
      
      <div class="flex items-center justify-center gap-2 mb-3">
        <span class="text-black font-bold text-xl">${{ product.price }}</span>
        <span v-if="originalPrice" class="text-gray-400 line-through text-sm">${{ originalPrice }}</span>
        <span v-if="discount" class="bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-full">{{ discount }}% off</span>
      </div>
      
      <button 
        @click.stop="addToCart"
        class="w-full bg-[#6C555C] hover:bg-[#30192F] text-white py-2 rounded-lg font-medium transition-all duration-200"
      >
        🛒 Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '../types'
import { useCart } from '../composables/useCart'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  'view-detail': [id: number]
}>()

const { addItem } = useCart()

const originalPrice = computed(() => {
  if (props.product.discountPercentage) {
    return Math.round(props.product.price / (1 - props.product.discountPercentage / 100))
  }
  return null
})

const discount = computed(() => {
  if (props.product.discountPercentage) {
    return Math.round(props.product.discountPercentage)
  }
  return null
})

const addToCart = () => {
  addItem(props.product)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>