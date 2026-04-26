import { ref } from 'vue'
import axios from 'axios'
import type { Product } from '../types'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const categoriesToFetch = ['beauty', 'fragrances', 'furniture', 'skincare', 'tops', 'womens-dresses']

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    products.value = []

    try {
      console.log('Starting to fetch products...')
      
      // Try alternative API endpoints if categories fail
      try {
        // First try: Get all products directly
        const response = await axios.get('https://dummyjson.com/products?limit=100')
        if (response.data && response.data.products) {
          products.value = response.data.products
          console.log(`Loaded ${products.value.length} products from main endpoint`)
          loading.value = false
          return
        }
      } catch (mainError) {
        console.log('Main endpoint failed, trying categories...')
      }
      
      // Second try: Fetch by categories
      const promises = categoriesToFetch.map(category =>
        axios.get(`https://dummyjson.com/products/category/${category}?limit=50`)
      )

      const responses = await Promise.all(promises)
      let allProducts: Product[] = []
      
      responses.forEach(response => {
        if (response.data && response.data.products) {
          allProducts = [...allProducts, ...response.data.products]
        }
      })

      // Remove duplicates by id
      const uniqueProducts = Array.from(
        new Map(allProducts.map(product => [product.id, product])).values()
      )

      products.value = uniqueProducts
      console.log(`Loaded ${products.value.length} products from categories`)

    } catch (err: any) {
      console.error('Failed to load products:', err)
      error.value = err.message || 'Failed to load products. Please check your internet connection.'
    } finally {
      loading.value = false
    }
  }

  const fetchProductById = async (id: number): Promise<Product | null> => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`)
      return response.data as Product
    } catch (err) {
      console.error('Failed to fetch product:', err)
      return null
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById
  }
}