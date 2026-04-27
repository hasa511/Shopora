import { ref } from 'vue'
import axios from 'axios'
import type { Product } from '../types'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Add more categories here
  const categoriesToFetch = ['beauty', 'fragrances', 'furniture', 'skincare', 'tops', 'womens-dresses']

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    products.value = []

    try {
      // Create an array of promises for each category API call
      const promises = categoriesToFetch.map(category =>
        axios.get(`https://dummyjson.com/products/category/${category}?limit=50`)
      )

      // Wait for all API calls to complete
      const responses = await Promise.all(promises)

      // Combine products from all responses
      let allProducts: Product[] = []
      responses.forEach(response => {
        if (response.data && response.data.products) {
          allProducts = [...allProducts, ...response.data.products]
        }
      })

      products.value = allProducts
      console.log(`Loaded ${products.value.length} products from categories:`, categoriesToFetch)
      console.log('Products:', products.value)

    } catch (err) {
      error.value = 'Failed to load products from specific categories'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts
  }
}