<template>
  <div 
    class="group rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
    :class="isDark ? 'bg-gray-800 hover:shadow-gray-700' : 'bg-white hover:shadow-xl'"
    @click="goToDetail"
  >
    <div class="relative overflow-hidden bg-gradient-to-br from-teal-200 via-cyan-100 to-orange-100 h-75">
      <img 
        :src="product.thumbnail" 
        :alt="product.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <div v-if="product.discountPercentage" class="absolute top-3 left-3">
        <span class="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
          {{ Math.round(product.discountPercentage) }}% OFF
        </span>
      </div>
      
      <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur rounded-full px-2 py-1 shadow-md">
        <div class="flex items-center gap-1">
          <span class="text-yellow-500 text-xs">★</span>
          <span class="text-xs font-bold">{{ product.rating }}</span>
        </div>
      </div>

      <!-- Quick View Button -->
      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button class="px-4 py-2 bg-white text-teal-600 rounded-full font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          Quick View
        </button>
      </div>
    </div>
    
    <div class="p-4">
      <p class="text-xs uppercase tracking-wider mb-1" :class="isDark ? 'text-gray-400' : 'text-gray-400'">
        {{ product.brand }}
      </p>
      <h3 class="font-semibold text-sm mb-2 line-clamp-2 transition-colors duration-300" :class="isDark ? 'text-white group-hover:text-white' : 'text-gray-800 group-hover:text-teal-600'">
        {{ product.title }}
      </h3>
      
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-baseline gap-2">
          <span class="text-lg font-bold transition-colors duration-300" :class="isDark ? 'text-white' : 'text-teal-600'">
            ${{ product.price }}
          </span>
          <span v-if="originalPrice" class="text-xs text-gray-400 line-through">${{ originalPrice }}</span>
        </div>
        <span class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-400'">{{ product.stock }} left</span>
      </div>
      
      <button 
        @click.stop="handleAddToCart"
        class="w-full py-2 rounded-xl font-medium transition-all duration-200 text-sm bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-700 hover:to-cyan-700 text-white"
      >
        🛒 Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '../types'
import { useCart } from '../composables/useCart'
import { useDarkMode } from '../composables/useDarkMode'

const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const { addToCart } = useCart()
const { isDark } = useDarkMode()

const originalPrice = computed(() => {
  if (props.product.discountPercentage) {
    return Math.round(props.product.price / (1 - props.product.discountPercentage / 100))
  }
  return null
})

const goToDetail = () => {
  router.push(`/product/${props.product.id}`)
}

const handleAddToCart = (event: Event) => {
  event.stopPropagation()
  addToCart(props.product, 1)
  router.push('/cart')
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
}
</style>