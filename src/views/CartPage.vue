<template>
  <div class="min-h-screen transition-all duration-500 flex flex-col" :class="isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-teal-50 via-cyan-50 to-orange-50'">
    
    <div class="container mx-auto px-4 py-8 max-w-6xl flex-1">
      
      <button @click="$router.back()" class="mb-4 flex items-center gap-2 transition-colors duration-300 rounded-full shadow-md inline-flex px-4 py-2" :class="isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-teal-600 hover:text-teal-700 shadow-sm'">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Continue Shopping
      </button>
      
      <h1 class="text-4xl font-bold transition-colors duration-300" :class="isDark ? 'text-white' : 'text-gray-800'">
        Your Shopping Cart 🛒
      </h1>
      <p class="mt-2 transition-colors duration-300" :class="isDark ? 'text-gray-400' : 'text-black'">
        {{ totalItems }} items in your cart
      </p>
      
      <div v-if="cartItems.length === 0" class="rounded-3xl shadow-xl p-16 text-center transition-colors duration-300 mt-8" :class="isDark ? 'bg-gray-800' : 'bg-white'">
        <div class="text-8xl mb-6">🛒</div>
        <h2 class="text-3xl font-semibold mb-3 transition-colors duration-300" :class="isDark ? 'text-gray-300' : 'text-gray-700'">Your cart is empty</h2>
        <p class="mb-8 transition-colors duration-300" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Looks like you haven't added any items to your cart yet.</p>
        <router-link to="/" class="inline-block px-8 py-3 rounded-xl font-semibold transition transform hover:scale-105 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white">
          Start Shopping
        </router-link>
      </div>

      <div v-else class="grid lg:grid-cols-3 gap-8 mt-8">
        <div class="lg:col-span-2 space-y-4">
          <div v-for="item in cartItems" :key="item.id" class="rounded-2xl shadow-md hover:shadow-xl p-5 flex gap-5 hover:shadow-xl transition-all duration-300" :class="isDark ? 'bg-gray-800 hover:shadow-gray-700' : 'bg-white hover:shadow-lg'">
            <img :src="item.thumbnail" :alt="item.title" class="w-28 h-28 object-cover rounded-xl"/>
            <div class="flex-1">
              <h3 class="font-semibold transition-colors duration-300" :class="isDark ? 'text-white' : 'text-gray-800'">{{ item.title }}</h3>
              <p class="text-sm mb-2" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ item.brand }}</p>
              <div class="flex items-center gap-2">
                <span class="text-yellow-400 text-sm">★</span>
                <span class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ item.rating }}</span>
              </div>
              <div class="mt-2">
                <span class="text-xl font-bold text-teal-600">${{ item.price }}</span>
              </div>
            </div>
            <div class="flex flex-col items-end justify-between">
              <button @click="removeFromCart(item.id)" class="text-red-500 hover:text-red-700 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
              <div class="flex items-center gap-3 mt-4">
                <button @click="updateQuantity(item.id, item.quantity - 1)" class="w-8 h-8 rounded-full transition text-lg font-bold" :class="isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'">-</button>
                <span class="w-8 text-center font-semibold" :class="isDark ? 'text-white' : 'text-gray-800'">{{ item.quantity }}</span>
                <button @click="updateQuantity(item.id, item.quantity + 1)" class="w-8 h-8 rounded-full transition text-lg font-bold" :class="isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'">+</button>
              </div>
              <div class="mt-4 text-right">
                <span class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Subtotal:</span>
                <span class="ml-2 font-bold text-teal-600">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>
          <div class="text-right">
            <button @click="clearCart" class="text-red-500 hover:text-red-700 transition text-sm flex items-center gap-1 ml-auto">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Clear Cart
            </button>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="rounded-2xl shadow-md p-6 sticky top-24 transition-colors duration-300" :class="isDark ? 'bg-gray-800' : 'bg-white'">
            <h2 class="text-2xl font-bold mb-6 transition-colors duration-300" :class="isDark ? 'text-white' : 'text-gray-800'">Order Summary</h2>
            <div class="space-y-4 border-b pb-5" :class="isDark ? 'border-gray-700' : 'border-gray-200'">
              <div class="flex justify-between">
                <span class="transition-colors duration-300" :class="isDark ? 'text-gray-400' : 'text-gray-600'">Subtotal</span>
                <span class="font-semibold" :class="isDark ? 'text-white' : 'text-gray-800'">${{ totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="transition-colors duration-300" :class="isDark ? 'text-gray-400' : 'text-gray-600'">Shipping</span>
                <span class="font-semibold text-green-600">Free</span>
              </div>
              <div class="flex justify-between">
                <span class="transition-colors duration-300" :class="isDark ? 'text-gray-400' : 'text-gray-600'">Tax</span>
                <span class="font-semibold" :class="isDark ? 'text-white' : 'text-gray-800'">$0.00</span>
              </div>
            </div>
            <div class="flex justify-between mt-5 pb-5 border-b" :class="isDark ? 'border-gray-700' : 'border-gray-200'">
              <span class="text-xl font-bold transition-colors duration-300" :class="isDark ? 'text-white' : 'text-gray-800'">Total</span>
              <span class="text-2xl font-bold text-teal-600">${{ totalPrice.toFixed(2) }}</span>
            </div>
            <div class="mt-6 space-y-4">
              <div class="text-sm rounded-lg p-3 transition-colors duration-300" :class="isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-500'">
                <p>Total Items: <span class="font-semibold" :class="isDark ? 'text-white' : 'text-gray-800'">{{ totalItems }}</span></p>
              </div>
              <button class="w-full py-3 rounded-xl font-semibold transition transform hover:scale-105 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-md">
                Proceed to Checkout →
              </button>
              <router-link to="/" class="block text-center text-sm transition-colors duration-300 hover:underline text-teal-600">
                ← Continue Shopping
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <FooterBar />
    
  </div>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'
import { useDarkMode } from '../composables/useDarkMode'
import FooterBar from '../components/FooterBar.vue'

const { 
  cartItems, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  totalItems, 
  totalPrice 
} = useCart()

const { isDark } = useDarkMode()
</script>