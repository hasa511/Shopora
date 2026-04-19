<template>
  <div class="container mx-auto p-4">
    <button @click="$router.back()" class="mb-4 text-pink-600">← Back</button>
    
    <div v-if="product" class="grid md:grid-cols-2 gap-8">
      <img :src="product.thumbnail" class="w-full rounded-lg">
      <div>
        <h1 class="text-3xl font-bold">{{ product.title }}</h1>
        <p class="text-gray-500">{{ product.brand }}</p>
        <p class="text-2xl font-bold text-pink-600 mt-4">${{ product.price }}</p>
        <p class="mt-4">{{ product.description }}</p>
        <button class="mt-6 w-full bg-pink-600 text-white py-3 rounded-lg">
          Add to Cart 🛒
        </button>
      </div>
    </div>
    <div v-else class="text-center p-8">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import type { Product } from '../types'

const route = useRoute()
const product = ref<Product | null>(null)

onMounted(async () => {
  const id = route.params.id
  const response = await axios.get(`https://dummyjson.com/products/${id}`)
  product.value = response.data
})
</script>