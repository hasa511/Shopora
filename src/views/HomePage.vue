<template>
  <div class="min-h-screen transition-all duration-500 flex flex-col" :class="isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-teal-50 via-cyan-50 to-orange-50'">
    
    <!-- Hero Section -->
    <div class="relative overflow-hidden hero-parallax min-h-screen flex items-center">
      <!-- Background -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-r from-teal-900/80 via-cyan-800/70 to-orange-800/80 z-10"></div>
        <img 
          src="https://www.shutterstock.com/shutterstock/photos/2537666313/display_1500/stock-photo-glamorous-editorial-photo-girl-holding-shopping-bags-walking-in-a-high-end-shopping-mall-hall-2537666313.jpg" 
          alt="Glamorous shopping experience"
          class="w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-black/40 z-10"></div>
      </div>
      
      <!-- Particle Background -->
      <div class="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div 
          v-for="i in 50" 
          :key="i" 
          class="absolute rounded-full"
          :style="{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            width: Math.random() * 6 + 2 + 'px',
            height: Math.random() * 6 + 2 + 'px',
            backgroundColor: `rgba(255, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 0.5 + 0.2})`
          }"
        ></div>
      </div>
      
    
      
      <div class="relative z-20 container mx-auto px-4 py-32 text-center">
        <div>
          <div class="inline-block mb-6 group">
            <span class="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold tracking-wide group-hover:scale-105 transition-transform inline-block">
              ✨ WELCOME TO THE FUTURE OF SHOPPING ✨
            </span>
          </div>
          
          <h1 class="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 hero-title">
            <span class="text-white drop-shadow-2xl inline-block">Shop</span>
            <span class="bg-gradient-to-r from-teal-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent inline-block">ora</span>
          </h1>
          
          <p class="text-xl md:text-2xl lg:text-3xl mb-6 text-white drop-shadow-lg font-light">
            Where Every Purchase Tells a Story
          </p>
          <p class="text-base md:text-lg mb-12 text-white/90 max-w-2xl mx-auto">
            Discover curated collections from premium brands worldwide. 
            
          </p>
          
          <div class="flex flex-wrap gap-4 justify-center">
            <router-link 
              to="/products"
              class="group relative px-10 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-full transition-all duration-300 shadow-2xl hover:scale-105 hover:shadow-teal-500/50 overflow-hidden"
            >
              <span class="relative z-10 flex items-center gap-2">
                Shop Now
                <svg class="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </router-link>
            
            <router-link 
              to="/products"
              class="px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
            >
              Browse Categories
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </router-link>
          </div>
          
          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
            <div class="stat-card bg-white/10 backdrop-blur-md rounded-2xl p-4 transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <div class="text-4xl font-bold text-white">50K+</div>
              <div class="text-sm text-white/80 mt-1">Happy Customers</div>
              <div class="stat-progress"></div>
            </div>
            <div class="stat-card bg-white/10 backdrop-blur-md rounded-2xl p-4 transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <div class="text-4xl font-bold text-white">100+</div>
              <div class="text-sm text-white/80 mt-1">Premium Brands</div>
              <div class="stat-progress"></div>
            </div>
            <div class="stat-card bg-white/10 backdrop-blur-md rounded-2xl p-4 transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <div class="text-4xl font-bold text-white">4.9★</div>
              <div class="text-sm text-white/80 mt-1">Customer Rating</div>
              <div class="stat-progress"></div>
            </div>
            <div class="stat-card bg-white/10 backdrop-blur-md rounded-2xl p-4 transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <div class="text-4xl font-bold text-white">24/7</div>
              <div class="text-sm text-white/80 mt-1">Support</div>
              <div class="stat-progress"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer" @click="scrollToProducts">
        <div class="w-6 h-10 border-2 border-white rounded-full flex justify-center relative">
          <div class="w-1 h-2 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </div>
    
    <!-- Featured Categories Section -->
    <div class="container mx-auto px-4 py-20">
      <div class="text-center mb-16">
        <div class="inline-block mb-4">
          <span class="px-6 py-2 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-600 rounded-full text-sm font-semibold">
            ✨ SHOP BY CATEGORY ✨
          </span>
        </div>
        <h2 class="text-5xl md:text-7xl font-bold mb-6" :class="isDark ? 'text-white' : 'text-gray-800'">
          Explore Our
          <span class="bg-gradient-to-r from-teal-600 via-cyan-600 to-orange-600 bg-clip-text text-transparent">Collections</span>
        </h2>
        <div class="flex justify-center gap-2 mb-6">
          <div class="w-12 h-1 bg-teal-500 rounded-full"></div>
          <div class="w-6 h-1 bg-cyan-500 rounded-full"></div>
          <div class="w-3 h-1 bg-orange-500 rounded-full"></div>
        </div>
        <p class="text-lg max-w-2xl mx-auto" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
          Find exactly what you're looking for in our curated categories
        </p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div 
          v-for="cat in featuredCategories" 
          :key="cat.value"
          @click="goToCategory(cat.value)"
          class="category-card group relative cursor-pointer rounded-2xl transition-all duration-500 hover:scale-105 overflow-hidden"
        >
          <div class="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-125">
            <img 
              :src="cat.image" 
              :alt="cat.label"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>
          <div class="relative z-10 p-6 text-center min-h-[260px] flex flex-col items-center justify-center">
            <p class="text-xl font-bold text-white drop-shadow-md group-hover:tracking-wider transition-all">
              {{ cat.label }}
            </p>
            <div class="mt-3 w-12 h-0.5 bg-white/50 group-hover:w-16 transition-all duration-300"></div>
            <div class="mt-3 text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-all duration-300">
              Shop Now →
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Call to Action Banner -->
    <div class="container mx-auto px-4 pb-20">
      <div class="relative overflow-hidden rounded-3xl group">
        <div class="absolute inset-0 bg-gradient-to-r from-teal-700 via-cyan-700 to-orange-700 transform group-hover:scale-110 transition-transform duration-700"></div>
        <div class="absolute inset-0 opacity-30">
          <div class="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div class="relative p-16 text-center">
          <h3 class="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Start Shopping?</h3>
          <p class="text-white/90 mb-8 max-w-2xl mx-auto text-lg">Explore our complete collection of premium products and find your perfect match.</p>
          <router-link to="/products" class="inline-block px-10 py-4 bg-white text-teal-600 font-bold rounded-full hover:shadow-xl transition-all hover:scale-105">
            View All Products →
          </router-link>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <FooterBar />
    
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useDarkMode } from '../composables/useDarkMode'
import FooterBar from '../components/FooterBar.vue'

const router = useRouter()
const { isDark } = useDarkMode()

interface Category {
  value: string
  label: string
  image: string
}

const featuredCategories: Category[] = [
  { value: 'beauty', label: 'Beauty', image: 'https://png.pngtree.com/background/20230414/original/pngtree-makeup-lipstick-foundation-cosmetics-beauty-makeup-fantasy-color-advertising-background-picture-image_2424119.jpg' },
  { value: 'fragrances', label: 'Fragrances', image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { value: 'furniture', label: 'Furniture', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { value: 'tops', label: 'Tops', image: 'https://i.pinimg.com/originals/8c/00/55/8c00556251b75c036726587161d79207.jpg' },
  { value: 'womens-dresses', label: 'Dresses', image: 'https://www.brides.com/thmb/TMa0ml_8_Kct0wMV3ZukJNk57R8=/3000x2000/filters:no_upscale():max_bytes(150000):strip_icc()/50609585_001_a-791161083e5047e0afe7fd5dd085a3e3.jpg' }
]

const goToCategory = (category: string) => {
  router.push(`/products?category=${category}`)
}

const scrollToProducts = () => {
  const categoriesSection = document.querySelector('.container')
  if (categoriesSection) {
    categoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.stat-card {
  position: relative;
  overflow: hidden;
}

.stat-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: linear-gradient(90deg, #14b8a6, #06b6d4);
  transition: width 0.3s ease;
}

.stat-card:hover .stat-progress {
  width: 100%;
}

.hero-title {
  display: inline-block;
  transform-style: preserve-3d;
}

.category-card {
  perspective: 1000px;
  transform-style: preserve-3d;
  min-height: 280px;
}

@media (max-width: 768px) {
  .category-card { min-height: 220px; }
  .text-6xl { font-size: 2.5rem; }
  .text-xl { font-size: 1rem; }
}

@media (max-width: 640px) {
  .category-card { min-height: 200px; }
  .text-6xl { font-size: 2rem; }
}
</style>