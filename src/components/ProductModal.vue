<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeModal"></div>
    
    <div class="relative min-h-screen flex items-center justify-center p-4">
      <div class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Close button -->
        <button 
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div v-if="product" class="p-6">
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Product Image -->
            <div>
              <img 
                :src="product.thumbnail" 
                :alt="product.title"
                class=" bg-[#DCD7D9] w-full h-80 rounded-lg shadow-md"
              />
            </div>

            <!-- Product Info -->
            <div>
              <span class="text-xs text-gray-500 uppercase tracking-wider">{{ product.brand }}</span>
              <h2 class="text-2xl font-bold text-gray-800 mt-1">{{ product.title }}</h2>
              
              <div class="flex items-center gap-2 mt-2">
                <div class="flex items-center">
                  <span class="text-yellow-400 text-lg">★</span>
                  <span class="font-medium text-gray-700 ml-1">{{ product.rating }}</span>
                </div>
                <span class="text-sm text-gray-500">({{ product.stock }} in stock)</span>
              </div>

              <div class="mt-4">
                <span class="text-3xl font-bold text-black">${{ product.price }}</span>
                <span v-if="product.discountPercentage" class="ml-2 text-sm text-red-500">
                  {{ Math.round(product.discountPercentage) }}% OFF
                </span>
              </div>

              <p class="mt-4 text-gray-600">{{ product.description }}</p>

              <div class="mt-6">
                <span class="text-sm font-medium text-gray-700">Category:</span>
                <span class="ml-2 text-sm text-gray-600">{{ product.category }}</span>
              </div>

              <button 
                @click="addToCart"
                class="mt-6 w-full bg-[#655553] text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-200"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types'
import { useCart } from '../composables/useCart'

const props = defineProps<{
  isOpen: boolean
  product: Product | null
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

const { addItem } = useCart()

const closeModal = () => {
  emit('update:isOpen', false)
}

const addToCart = () => {
  if (props.product) {
    addItem(props.product)
  }
}
</script>