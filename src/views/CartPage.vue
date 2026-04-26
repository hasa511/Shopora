<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <!-- Header -->
      <div class="mb-8">
        <button 
          @click="$router.back()" 
          class="mb-4 flex items-center gap-2 text-[#634A61] hover:text-[#483146] transition-colors bg-white px-4 py-2 rounded-full shadow-md inline-flex"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Continue Shopping
        </button>
        <h1 class="text-4xl font-bold text-gray-800">Your Shopping Cart 🛒</h1>
        <p class="text-gray-500 mt-2">{{ totalItems }} items in your cart</p>
      </div>
      
      <!-- Empty Cart -->
      <div v-if="cartItems.length === 0" class="bg-white rounded-3xl shadow-xl p-16 text-center">
        <div class="text-8xl mb-6">🛒</div>
        <h2 class="text-3xl font-semibold text-gray-700 mb-3">Your cart is empty</h2>
        <p class="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
        <router-link 
          to="/" 
          class="inline-block bg-[#634A61] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#483146] transition transform hover:scale-105"
        >
          Start Shopping
        </router-link>
      </div>

      <!-- Cart with Items -->
      <div v-else class="grid lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div 
            v-for="item in cartItems" 
            :key="item.id"
            class="bg-white rounded-2xl shadow-lg p-5 flex gap-5 hover:shadow-xl transition"
          >
            <!-- Product Image -->
            <img 
              :src="item.thumbnail" 
              :alt="item.title"
              class="w-28 h-28 object-cover rounded-xl"
            />
            
            <!-- Product Info -->
            <div class="flex-1">
              <h3 class="font-semibold text-gray-800">{{ item.title }}</h3>
              <p class="text-sm text-gray-500 mb-2">{{ item.brand }}</p>
              <div class="flex items-center gap-2">
                <span class="text-yellow-400 text-sm">★</span>
                <span class="text-sm text-gray-600">{{ item.rating }}</span>
              </div>
              <div class="mt-2">
                <span class="text-xl font-bold text-[#634A61]">${{ item.price }}</span>
              </div>
            </div>
            
            <!-- Quantity Controls and Remove -->
            <div class="flex flex-col items-end justify-between">
              <button 
                @click="removeFromCart(item.id)"
                class="text-red-500 hover:text-red-700 transition"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
              
              <div class="flex items-center gap-3 mt-4">
                <button 
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition text-lg font-bold"
                >
                  -
                </button>
                <span class="w-8 text-center font-semibold">{{ item.quantity }}</span>
                <button 
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition text-lg font-bold"
                >
                  +
                </button>
              </div>
              
              <div class="mt-4 text-right">
                <span class="text-sm text-gray-500">Subtotal:</span>
                <span class="ml-2 font-bold text-[#634A61]">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Clear Cart Button -->
          <div class="text-right">
            <button 
              @click="clearCart"
              class="text-red-500 hover:text-red-700 transition text-sm flex items-center gap-1 ml-auto"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Clear Cart
            </button>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div class="space-y-4 border-b pb-5">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-semibold">${{ totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span class="font-semibold text-green-600">Free</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tax</span>
                <span class="font-semibold">$0.00</span>
              </div>
            </div>
            
            <div class="flex justify-between mt-5 pb-5 border-b">
              <span class="text-xl font-bold text-gray-800">Total</span>
              <span class="text-2xl font-bold text-[#634A61]">${{ totalPrice.toFixed(2) }}</span>
            </div>
            
            <div class="mt-6 space-y-4">
              <div class="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                <p>Total Items: <span class="font-semibold text-gray-800">{{ totalItems }}</span></p>
              </div>
              
              <button 
                class="w-full bg-[#634A61] hover:bg-[#483146] text-white py-3 rounded-xl font-semibold transition transform hover:scale-105"
              >
                Proceed to Checkout →
              </button>
              
              <router-link 
                to="/"
                class="block text-center text-[#634A61] hover:underline text-sm"
              >
                ← Continue Shopping
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'

const { 
  cartItems, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  totalItems, 
  totalPrice 
} = useCart()
</script>