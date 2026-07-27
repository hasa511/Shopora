import { ref, computed } from 'vue'
import type { Product, CartItem } from '../types'

export function useCart() {
  const cartItems = ref<CartItem[]>([])

  const loadCart = () => {
    const savedCart = localStorage.getItem('shopora_cart')
    if (savedCart) {
      try {
        cartItems.value = JSON.parse(savedCart)
      } catch (e) {
        console.error('Failed to load cart:', e)
        cartItems.value = []
      }
    }
  }

  const saveCart = () => {
    localStorage.setItem('shopora_cart', JSON.stringify(cartItems.value))
  }

  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.value.push({ ...product, quantity })
    }
    
    saveCart()
    console.log(`Added ${quantity} x ${product.title} to cart`)
  }

  const removeFromCart = (id: number) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id)
    saveCart()
  }

  const updateQuantity = (id: number, quantity: number) => {
    const item = cartItems.value.find(item => item.id === id)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(id)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
    saveCart()
  }

  const totalItems = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })

  const isInCart = (id: number) => {
    return cartItems.value.some(item => item.id === id)
  }

  const getItemQuantity = (id: number) => {
    const item = cartItems.value.find(item => item.id === id)
    return item?.quantity || 0
  }

  loadCart()

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isInCart,
    getItemQuantity
  }
}