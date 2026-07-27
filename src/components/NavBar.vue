<template>
  <nav 
    class="sticky top-0 z-50 transition-all duration-500"
    :class="[
      isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl' : 'bg-transparent',
      isDark ? 'text-white' : 'text-gray-800'
    ]"
  >
    <div class="px-6 py-4 flex justify-between items-center">
      
      <router-link to="/" class="group flex items-center space-x-3">
        <div class="relative">
          
          <div class="absolute -top-1 -right-2 w-2 h-2 bg-teal-500 rounded-full animate-ping"></div>
        </div>
        <div>
          <h1 class="text-2xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-orange-600 bg-clip-text text-transparent">
            Shopora
          </h1>
          <p class="text-xs opacity-75 hidden md:block">Where Style Meets Luxury</p>
        </div>
      </router-link>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8">
        <router-link 
          to="/" 
          class="relative px-3 py-2 font-semibold transition-all duration-300 group"
          :class="isDark ? 'text-gray-200' : 'text-gray-700'"
        >
          Home
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        
        <router-link 
          to="/products" 
          class="relative px-3 py-2 font-semibold transition-all duration-300 group"
          :class="isDark ? 'text-gray-200' : 'text-gray-700'"
        >
          Products
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        
        <router-link 
          to="/cart" 
          class="relative px-3 py-2 font-semibold transition-all duration-300 group flex items-center gap-2"
          :class="isDark ? 'text-gray-200' : 'text-gray-700'"
        >
          <span>🛒</span>
          <span>Cart</span>
          <span 
            v-if="cartCount > 0"
            class="absolute -top-2 -right-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full px-2 py-0.5 text-xs font-bold animate-pulse"
          >
            {{ cartCount }}
          </span>
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
        </router-link>

        <div class="h-8 w-px bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>

  <!-- Simple Text Only Toggle -->
<button
  @click="toggleDarkMode"
  class="px-4 py-2 rounded-lg font-semibold transition-all duration-300"
  :class="isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'"
>
  {{ isDark ? 'Dark' : 'Light' }}
</button>

        <!-- Glassmorphism Login Button -->
        <button 
          v-if="!isAuthenticated"
          @click="showAuthModal = true"
          class="relative px-8 py-2.5 rounded-full font-semibold transition-all duration-300 overflow-hidden group"
          :class="isDark ? 'bg-white/10 text-white' : 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white'"
        >
          <span class="relative z-10 flex items-center gap-2">
            <span>👤</span>
            Sign In
          </span>
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>

        <!-- User Menu -->
        <div v-else class="relative">
          <button 
            @click="toggleDropdown"
            class="flex items-center gap-3 px-3 py-2 rounded-full transition-all duration-300 hover:bg-white/10 backdrop-blur-sm group"
          >
            <div class="relative">
              <img 
                :src="user?.image" 
                :alt="user?.firstName"
                class="w-10 h-10 rounded-full border-2 border-teal-500 object-cover"
                @error="handleImageError"
              />
              <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div class="text-left hidden lg:block">
              <p class="text-sm font-semibold">{{ user?.firstName }} {{ user?.lastName }}</p>
              <p class="text-xs opacity-75">{{ user?.email }}</p>
            </div>
            <svg class="w-4 h-4 transition-transform duration-300" :class="{ 'rotate-180': isDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <!-- Dropdown Menu -->
          <transition name="dropdown">
            <div v-if="isDropdownOpen" 
                class="absolute right-0 mt-3 w-64 rounded-2xl shadow-2xl z-50 py-2 backdrop-blur-xl transition-all duration-300"
                :class="isDark ? 'bg-gray-900/95 border border-gray-700' : 'bg-white/95 border border-gray-200'"
                @click.stop>
              <div class="px-4 py-3 border-b" :class="isDark ? 'border-gray-700' : 'border-gray-100'">
                <div class="flex items-center gap-3">
                  <img :src="user?.image" class="w-12 h-12 rounded-full">
                  <div>
                    <p class="font-bold">{{ user?.firstName }} {{ user?.lastName }}</p>
                    <p class="text-xs opacity-75">{{ user?.email }}</p>
                  </div>
                </div>
              </div>
              
              <div class="py-2">
                <router-link to="/products" @click="isDropdownOpen = false" class="w-full text-left px-4 py-2 text-sm transition-colors hover:bg-teal-50 dark:hover:bg-gray-800 flex items-center gap-3">
                   All Products
                </router-link>
                <button class="w-full text-left px-4 py-2 text-sm transition-colors hover:bg-teal-50 dark:hover:bg-gray-800 flex items-center gap-3">
                   My Orders
                </button>
                <button class="w-full text-left px-4 py-2 text-sm transition-colors hover:bg-teal-50 dark:hover:bg-gray-800 flex items-center gap-3">
                   Wishlist
                </button>
              </div>
              
              <div class="border-t" :class="isDark ? 'border-gray-700' : 'border-gray-100'"></div>
              
              <button 
                @click="handleLogout"
                class="w-full text-left px-4 py-2 text-sm transition-colors mt-1 flex items-center gap-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                 Logout
              </button>
            </div>
          </transition>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden p-2 rounded-lg transition-all duration-300"
        :class="isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-down">
      <div v-if="mobileMenuOpen" class="md:hidden py-4 px-6 space-y-3 border-t" :class="isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'">
        <router-link to="/" @click="mobileMenuOpen = false" class="block py-2 font-semibold">Home</router-link>
        <router-link to="/products" @click="mobileMenuOpen = false" class="block py-2 font-semibold">Products</router-link>
        <router-link to="/cart" @click="mobileMenuOpen = false" class="block py-2 font-semibold flex items-center gap-2">
          Cart 
          <span v-if="cartCount > 0" class="bg-teal-500 text-white rounded-full px-2 py-0.5 text-xs">{{ cartCount }}</span>
        </router-link>
        <button 
          v-if="!isAuthenticated"
          @click="showAuthModal = true; mobileMenuOpen = false"
          class="w-full py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full font-semibold"
        >
          Sign In
        </button>
        <button 
          v-else
          @click="handleLogout; mobileMenuOpen = false"
          class="w-full py-2 bg-red-500 text-white rounded-full font-semibold"
        >
          Logout
        </button>
      </div>
    </transition>

    <AuthModal :isOpen="showAuthModal" @update:isOpen="showAuthModal = $event" />
  </nav>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useCart } from '../composables/useCart';
import { useAuth } from '../composables/useAuth';
import { useDarkMode } from '../composables/useDarkMode';
import AuthModal from './AuthModal.vue';

const { totalItems } = useCart();
const { isAuthenticated, user, logout } = useAuth();
const { isDark, toggleDarkMode } = useDarkMode();

const cartCount = computed(() => totalItems.value);
const showAuthModal = ref(false);
const isDropdownOpen = ref(false);
const mobileMenuOpen = ref(false);
const isScrolled = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    isDropdownOpen.value = false;
  }
};

const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    isDropdownOpen.value = false;
    mobileMenuOpen.value = false;
    logout();
  }
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = `https://ui-avatars.com/api/?background=14b8a6&color=fff&bold=true&name=${user.value?.firstName || 'User'}`;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>