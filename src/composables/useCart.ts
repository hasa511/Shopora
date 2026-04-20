import { ref } from 'vue'
import type { Product } from '../types'

export function useCart() {
  const cartItems = ref<Product[]>([])

  const addItem = (product: Product) => {
    cartItems.value.push(product)
    console.log('Added to cart:', product.title)
  }

  const removeItem = (id: number) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id)
  }

  const clearCart = () => {
    cartItems.value = []
  }

  return {
    cartItems,
    addItem,
    removeItem,
    clearCart
  }
}