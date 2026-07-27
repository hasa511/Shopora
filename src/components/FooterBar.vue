<template>
  <footer class="mt-auto" :class="isDark ? 'bg-gray-900' : 'bg-gray-900'">
    <!-- Main Footer -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <!-- Brand Column -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
            </div>
            <h3 class="text-2xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">Shopora</h3>
          </div>
          <p class="text-gray-400 mb-4 text-sm">
            Where Every Purchase Tells a Story. Discover curated collections from premium brands worldwide.
          </p>
          <div class="flex gap-3">
            <!-- Facebook Icon -->
            <a href="#" class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#1877F2] hover:text-white transition-colors duration-300">
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </a>
            <!-- Instagram Icon -->
           <a href="#" class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#E4405F] hover:text-white transition-colors duration-300">
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  </a>
            <!-- LinkedIn Icon -->
             <a href="#" class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-colors duration-300">
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
    </svg>
  </a>
            <!-- TikTok Icon -->
            <a href="#" class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#000000] hover:text-white transition-colors duration-300">
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.23 1.69 2.89 2.89 0 0 1 2.54-4.34 2.93 2.93 0 0 1 .74.09V9.47a6.38 6.38 0 0 0-6.36 5.33 6.4 6.4 0 0 0 3.6 6.42 6.38 6.38 0 0 0 7.17-1.06 6.38 6.38 0 0 0 2.14-4.72v-7.1a9.37 9.37 0 0 0 4.56 1.19V9.47c-2.77 0-4.94-1.92-4.94-4.78z"/>
    </svg>
  </a>
          </div>
        </div>
        
        <!-- Quick Links Column -->
        <div>
          <h4 class="text-white font-semibold mb-4 text-lg">Quick Links</h4>
          <ul class="space-y-2">
            <li><router-link to="/" class="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm">Home</router-link></li>
            <li><router-link to="/products" class="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm">Products</router-link></li>
            <li><router-link to="/cart" class="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm">Cart</router-link></li>
            <li><a href="#" class="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm">About Us</a></li>
            <li><a href="#" class="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm">Contact</a></li>
          </ul>
        </div>
        
        <!-- Customer Service Column -->
        <div>
          <h4 class="text-white font-semibold mb-4 text-lg">Customer Service</h4>
          <ul class="space-y-2">
            <li class="text-gray-400 text-sm cursor-default">FAQ</li>
            <li class="text-gray-400 text-sm cursor-default">Shipping Info</li>
            <li class="text-gray-400 text-sm cursor-default">Returns Policy</li>
            <li class="text-gray-400 text-sm cursor-default">Payment Methods</li>
            <li class="text-gray-400 text-sm cursor-default">Track Order</li>
          </ul>
        </div>
        
        <!-- Newsletter Column -->
        <div>
          <h4 class="text-white font-semibold mb-4 text-lg">Newsletter</h4>
          <p class="text-gray-400 text-sm mb-3">Subscribe to get special offers, new arrivals, and exclusive deals.</p>
          <div class="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              class="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-teal-500"
            />
            <button class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg text-sm font-semibold">
              Subscribe
            </button>
          </div>
        </div>
        
      </div> <!-- END grid -->
      
      <!-- Divider -->
      <div class="border-t border-gray-800 my-8"></div>
      
      <!-- Bottom Bar -->
      <div class="text-center">
        <p class="text-gray-500 text-sm">
          &copy; 2024 Shopora. All rights reserved. | Designed with ❤️ for luxury shopping
        </p>
      </div>
      
    </div> <!-- END container -->
  </footer>
</template>

<script setup lang="ts">
import { useDarkMode } from '../composables/useDarkMode'

const { isDark } = useDarkMode()
</script>