import { ref, computed } from 'vue'
import type { Product, CartItem } from '../types'

export function useCart() {
  const cartItems = ref<CartItem[]>([])

  // Load cart from localStorage on initialization
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

  // Save cart to localStorage
  const saveCart = () => {
    localStorage.setItem('shopora_cart', JSON.stringify(cartItems.value))
  }

  // Add item to cart
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

  // Remove item from cart
  const removeFromCart = (id: number) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id)
    saveCart()
  }

  // Update item quantity
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

  // Clear entire cart
  const clearCart = () => {
    cartItems.value = []
    saveCart()
  }

  // Get total number of items in cart
  const totalItems = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  // Get total price of all items in cart
  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })

  // Check if item is in cart
  const isInCart = (id: number) => {
    return cartItems.value.some(item => item.id === id)
  }

  // Get item quantity in cart
  const getItemQuantity = (id: number) => {
    const item = cartItems.value.find(item => item.id === id)
    return item?.quantity || 0
  }

  // Load cart on initialization
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