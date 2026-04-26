<template>
  <div 
    class="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
    @click="goToDetail"
  >
    <!-- Image Section -->
    <div class="relative overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 h-75">
      <img 
        :src="product.thumbnail" 
        :alt="product.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <!-- Discount Badge -->
      <div v-if="product.discountPercentage" class="absolute top-3 left-3">
        <span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
          {{ Math.round(product.discountPercentage) }}% OFF
        </span>
      </div>
      
      <!-- Rating Badge -->
      <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur rounded-full px-2 py-1 shadow-md">
        <div class="flex items-center gap-1">
          <span class="text-yellow-500 text-xs">★</span>
          <span class="text-xs font-bold">{{ product.rating }}</span>
        </div>
      </div>
    </div>
    
    <!-- Content Section -->
    <div class="p-4">
      <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">{{ product.brand }}</p>
      <h3 class="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-[#634A61] transition">
        {{ product.title }}
      </h3>
      
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-baseline gap-2">
          <span class="text-lg font-bold text-[#634A61]">${{ product.price }}</span>
          <span v-if="originalPrice" class="text-xs text-gray-400 line-through">${{ originalPrice }}</span>
        </div>
        <span class="text-xs text-gray-400">{{ product.stock }} left</span>
      </div>
      
      <!-- Add to Cart Button - Navigates to Cart Page -->
      <button 
        @click.stop="handleAddToCart"
        class="w-full bg-[#634A61] hover:bg-[#483146] text-white py-2 rounded-xl font-medium transition-all duration-200 text-sm"
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

const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const { addToCart } = useCart()

const originalPrice = computed(() => {
  if (props.product.discountPercentage) {
    return Math.round(props.product.price / (1 - props.product.discountPercentage / 100))
  }
  return null
})

const goToDetail = () => {
  router.push(`/product/${props.product.id}`)
}

// Add to cart AND navigate to cart page
const handleAddToCart = (event: Event) => {
  event.stopPropagation()
  addToCart(props.product, 1)
  // Navigate to cart page after adding
  router.push('/cart')
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